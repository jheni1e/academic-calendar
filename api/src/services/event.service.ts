import { prisma } from "../lib/prisma.ts";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { Event } from "../generated/prisma/client.ts";
import { findSubjectById } from "./subject.service.ts";

export const createEvent = async (data: CreateEventDTO): Promise<Event> => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid event dates.");
    }

    if (data.eventTypeId === "lesson" && data.subjectId) {
        const subject = await findSubjectById(data.subjectId);
    
        if (!subject) {
            throw new Error("Subject not found.");
        }
    
        if (subject.workload <= 0) {
            await finishSubjectSchedule(data.subjectId);
    
            throw new Error("Subject workload already completed.");
        }
    }

    if (data.eventTypeId === "lesson") {
        if (!data.instructorId) {
            throw new Error("Lesson requires an instructor.");
        }

        if (!data.classId) {
            throw new Error("Lesson requires a class.");
        }

        const classAvailable = await checkClassAvailability(
            data.classId,
            start,
            end
        );

        const instructorAvailable = await checkInstructorAvailability(
            data.instructorId,
            start,
            end
        );

        const room = await findAvailableRoom(
            start,
            end
        );

        if (!classAvailable || !instructorAvailable || !room) {
            const nextDate = await findNextAvailableDate(data);

            return createEvent({
                ...data,
                startDate: nextDate.start,
                endDate: nextDate.end,
            });
        }
    }

    const conflictingEvents = await prisma.event.findMany({
        where: {
            start_date: {
                lte: end,
            },
            end_date: {
                gte: start,
            },
        },
    });

    for (const event of conflictingEvents) {
        if (event.event_type_id === "external") {
            throw new Error(
                "There is an external event in this period."
            );
        }

        if (event.event_type_id === "lesson") {
            if (event.subject_id) {
                await prisma.subject.update({
                    where: {
                        subject_id: event.subject_id,
                    },
                    data: {
                        workload: {
                            increment: 4,
                        },
                    },
                });
            }

            await deleteEvent(event.event_id);
        }
    }

    return prisma.event.create({
        data: {
            title: data.title,
            description: data.description,
            event_type_id: data.eventTypeId,
            subject_id: data.subjectId,
            class_id: data.classId,
            created_by: data.createdBy
        }
    });
}

const checkClassAvailability = async (classId: number, start: Date, end: Date): Promise<boolean> => {
    const externalEvent = await prisma.event.findFirst({
        where: {
            class_id: classId,
            event_type_id: "external",
            start_date: {
                lte: end,
            },
            end_date: {
                gte: start,
            },
        },
    });

    return !externalEvent;
};

const checkInstructorAvailability = async (instructorId: number, start: Date, end: Date): Promise<boolean> => {
    const conflict = await prisma.event.findFirst({
        where: {
            created_by: instructorId,
            start_date: {
                lte: end,
            },
            end_date: {
                gte: start,
            },
        },
    });

    return !conflict;
};

const findAvailableRoom = async (start: Date, end: Date): Promise<number | null> => {
    const room = await prisma.room.findFirst({
        where: {
            reservations: {
                none: {
                    start_date: {
                        lte: end,
                    },
                    end_date: {
                        gte: start,
                    },
                },
            },
        },
    });

    if (!room) {
        return null;
    }

    return room.room_id;
};

const findNextAvailableDate = async (data: CreateEventDTO): Promise<{start: Date;end: Date;}> => {
    let start = new Date(data.startDate);
    let end = new Date(data.endDate);

    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 1);

    return {
        start,
        end,
    };
};

const finishSubjectSchedule = async (subjectId: number): Promise<void> => {
    await prisma.subject.update({
        where: {
            subject_id: subjectId,
        },
        data: {
            is_active: false,
        },
    });
};

export const findEventById = async (eventId: number): Promise<Event | null> => {

    return prisma.event.findUnique({
        where: {
            event_id: eventId
        }
    });

}

export const findEventByClass = async (classId: number): Promise<Event[]> => {

    return prisma.event.findMany({
        where: {
            class_id: classId
        }
    });

}

export const findAllEvents = async (): Promise<Event[]> => {

    return prisma.event.findMany();

}

export const updateEvent = async (
    eventId: number,
    data: UpdateEventDTO
): Promise<Event> => {

    return prisma.event.update({
        where: {
            event_id: eventId
        },
        data: {
            title: data.title,
            description: data.description,
            event_type_id: data.eventTypeId,
            subject_id: data.subjectId,
            class_id: data.classId
        }
    });

}

export const deleteEvent = async (eventId: number): Promise<void> => {

    await prisma.event.delete({
        where: {
            event_id: eventId
        }
    });

}