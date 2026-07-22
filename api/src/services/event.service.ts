import { prisma } from "../lib/prisma.ts";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { Class, Event, EventStatus, EventType, Subject, SubjectInstructor, User } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { ValidationError } from "../shared/errors/ValidationError.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";
import { createReservation, updateReservationByEvent } from "./reservation.service.ts";

const validateDates = (
    start: Date,
    end: Date
): void => {

    if (isNaN(start.getTime())) {
        throw new ValidationError(
            "Invalid start date."
        );
    }

    if (isNaN(end.getTime())) {
        throw new ValidationError(
            "Invalid end date."
        );
    }

    if (start >= end) {
        throw new ValidationError(
            "Start date must be before end date."
        );
    }
};

export type LoadedAssignment = SubjectInstructor & {
    subject: Subject & {
        class: Class;
    };
    instructor: User;
};

const loadAssignment = async (
    subjectInstructorId: number
): Promise<LoadedAssignment> => {

    const assignment =
        await prisma.subjectInstructor.findUnique({

            where: {
                subject_instructor_id: subjectInstructorId
            },

            include: {
                instructor: true,

                subject: {
                    include: {
                        class: true
                    }
                }
            }
        });

    if (!assignment) {
        throw new NotFoundError(
            "Instructor assignment not found."
        );
    }

    return assignment;
};

const LESSON_DURATION = 4;

// ------- CONFLICTS ---------

const validateSubjectWorkload = (
    assignment: LoadedAssignment
): void => {

    const remainingHours =
        assignment.subject.workload -
        assignment.subject.completed_workload;

    if (remainingHours < LESSON_DURATION) {
        throw new ConflictError(
            "Subject workload has already been completed."
        );
    }
};

const validateInstructorConflict = async (
    assignment: LoadedAssignment,
    start: Date,
    end: Date
): Promise<void> => {

    const conflict = await prisma.event.findFirst({
        where: {
            status: EventStatus.SCHEDULED,

            start_date: {
                lt: end
            },

            end_date: {
                gt: start
            },

            subject_instructor: {
                instructor_id: assignment.instructor.user_id
            }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Instructor already has another lesson scheduled during this period."
        );
    }
};

const validateClassConflict = async (
    classId: number,
    start: Date,
    end: Date
): Promise<void> => {

    const conflict = await prisma.event.findFirst({
        where: {
            class_id: classId,
            status: EventStatus.SCHEDULED,

            start_date: {
                lt: end
            },

            end_date: {
                gt: start
            }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Class already has a scheduled event during this period."
        );
    }
};

// --- HELPERS ---

const createEventRecord = async (
    data: CreateEventDTO,
    assignment: LoadedAssignment | null,
    start: Date,
    end: Date
): Promise<Event> => {

    return prisma.event.create({
        data: {
            title: data.title,
            description: data.description,

            event_type: data.eventType,
            status: EventStatus.SCHEDULED,

            start_date: start,
            end_date: end,

            created_by: data.createdBy,

            class_id:
                assignment?.subject.class.class_id,

            subject_instructor_id:
                assignment?.subject_instructor_id,

            recurrence_id:
                data.recurrenceId,

            is_blocked: false
        }
    });

};

const validateLesson = async (
    subjectInstructorId: number,
    start: Date,
    end: Date
): Promise<LoadedAssignment> => {

    const assignment = await loadAssignment(
        subjectInstructorId
    );

    validateSubjectWorkload(assignment);

    await validateInstructorConflict(
        assignment,
        start,
        end
    );

    await validateClassConflict(
        assignment.subject.class.class_id,
        start,
        end
    );

    return assignment;
};

export const createEvent = async (
    data: CreateEventDTO
): Promise<Event> => {

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    validateDates(start, end);

    let assignment: LoadedAssignment | null = null;

    if (data.eventType === EventType.LESSON) {
        assignment = await validateLesson(
            data.subjectInstructorId,
            start,
            end
        );
    }

    if (!data.roomId) {
        throw new ValidationError(
            "Room is required."
        );
    }

    return prisma.$transaction(async () => {
        const event = await createEventRecord(
            data,
            assignment,
            start,
            end
        );

        await createReservation({
            roomId: data.roomId,
            eventId: event.event_id,
            startDate: start,
            endDate: end,
            description: data.description
        });

        return event;
    });
};

// ---- CRUD ----

export const findEventById = async (
    eventId: number
): Promise<Event | null> => {

    return prisma.event.findUnique({
        where: {
            event_id: eventId
        },
        include: {
            class: true,
            creator: true,
            recurrence: true,
            reservation: {
                include: {
                    room: true
                }
            },
            subject_instructor: {
                include: {
                    subject: true,
                    instructor: true
                }
            }
        }
    });

};

export const findEvents = async (): Promise<Event[]> => {

    return prisma.event.findMany({
        orderBy: {
            start_date: "asc"
        },
        include: {
            class: true,
            recurrence: true,
            reservation: {
                include: {
                    room: true
                }
            },
            subject_instructor: {
                include: {
                    subject: true,
                    instructor: true
                }
            }
        }
    });

};

export const findEventsByClass = async (
    classId: number
): Promise<Event[]> => {

    return prisma.event.findMany({
        where: {
            class_id: classId
        },
        orderBy: {
            start_date: "asc"
        },
        include: {
            reservation: {
                include: {
                    room: true
                }
            },
            subject_instructor: {
                include: {
                    subject: true,
                    instructor: true
                }
            }
        }
    });

};

export const findEventsByInstructor = async (
    instructorId: number
): Promise<Event[]> => {

    return prisma.event.findMany({
        where: {
            subject_instructor: {
                instructor_id: instructorId
            }
        },
        orderBy: {
            start_date: "asc"
        },
        include: {
            class: true,
            reservation: {
                include: {
                    room: true
                }
            },
            subject_instructor: {
                include: {
                    subject: true
                }
            }
        }
    });

};

export const updateEvent = async (
    eventId: number,
    data: UpdateEventDTO
): Promise<Event> => {

    const event = await findEventById(eventId);

    if (!event) {
        throw new NotFoundError(
            "Event not found."
        );
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    validateDates(start, end);

    let assignment: LoadedAssignment | null = null;

    if (
        data.eventType === EventType.LESSON &&
        data.subjectInstructorId
    ) {
        assignment = await validateLesson(
            data.subjectInstructorId,
            start,
            end
        );
    }

    return prisma.$transaction(async () => {
        const updatedEvent = await prisma.event.update({
            where: {
                event_id: eventId
            },
            data: {
                title: data.title,
                description: data.description,
                event_type: data.eventType,

                start_date: start,
                end_date: end,

                class_id: assignment?.subject.class.class_id,
                subject_instructor_id:
                    assignment?.subject_instructor_id,

                recurrence_id: data.recurrenceId
            }
        });

        if (data.roomId) {
            await updateReservationByEvent(eventId, {
                roomId: data.roomId,
                startDate: start,
                endDate: end,
                description: data.description
            });
        }

        return updatedEvent;
    });
};

export const deleteEvent = async (
    eventId: number
): Promise<void> => {

    const event = await findEventById(eventId);

    if (!event) {
        throw new NotFoundError(
            "Event not found."
        );
    }

    await prisma.event.delete({
        where: {
            event_id: eventId
        }
    });

};