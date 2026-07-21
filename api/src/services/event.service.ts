import { prisma } from "../lib/prisma.ts";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { Class, Event, EventStatus, EventType, Subject, SubjectInstructor, User } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { ValidationError } from "../shared/errors/ValidationError.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";


// interface EventContext {
//     assignment: SubjectInstructor;
//     subject: Subject;
//     instructor: User;
//     class: Class;
// }

export type LoadedAssignment = SubjectInstructor & {
    subject: Subject & {
        class: Class;
    };
    instructor: User;
};

const loadEventContext = async (
    data: CreateEventDTO
): Promise<LoadedAssignment> => {

    if (!data.subjectInstructorId) {
        throw new ValidationError(
            "Lesson requires an instructor assignment."
        );
    }

    const assignment = await prisma.subjectInstructor.findUnique({
        where: {
            subject_instructor_id: data.subjectInstructorId
        },
        include: {
            subject: {
                include: {
                    class: true
                }
            },
            instructor: true
        }
    });

    if (!assignment) {
        throw new NotFoundError(
            "Instructor assignment not found."
        );
    }

    return assignment;
};

const validateDates = (
    start: Date,
    end: Date
) => {
    
    if (isNaN(start.getTime()))
        throw new ValidationError("Invalid start date.");

    if (isNaN(end.getTime()))
        throw new ValidationError("Invalid end date.");

    if (start >= end)
        throw new ValidationError(
            "Start date must be before end date."
        );
}

const validateLesson = async (
    data: CreateEventDTO
) => {

    if (data.eventType !== EventType.LESSON)
        return;

    if (!data.subjectInstructorId)
        throw new ValidationError(
            "Lesson requires an instructor assignment."
        );

    const assignment = await prisma.subjectInstructor.findUnique({
        where: {
            subject_instructor_id: data.subjectInstructorId
        },
        include: {
            subject: true,
            instructor: true
        }
    });

    if (!assignment)
        throw new NotFoundError(
            "Instructor assignment not found."
        );

    const remaining =
        assignment.subject.workload -
        assignment.subject.completed_workload;
    
    if (remaining < 4) { // TODO: VARIABLE
        throw new ConflictError(
            "Subject workload has already been completed."
        );
    }

    return assignment;
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
                lte: end
            },

            end_date: {
                gte: start
            }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Class already has a scheduled event during this period."
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
                lte: end
            },

            end_date: {
                gte: start
            },

            subject_instructor: {
                instructor_id: assignment.instructor.user_id
            }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Instructor already has a scheduled event during this period."
        );
    }
};

const validateRoomConflict = async (
    roomId: number,
    start: Date,
    end: Date
): Promise<void> => {

    const conflict = await prisma.reservation.findFirst({
        where: {
            room_id: roomId,

            event: {
                status: EventStatus.SCHEDULED,

                start_date: {
                    lte: end
                },

                end_date: {
                    gte: start
                }
            }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Room already has a scheduled reservation during this period."
        );
    }
};

export const createEvent = async (
    data: CreateEventDTO
): Promise<Event> => {

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new ValidationError(
            "Invalid event dates."
        );
    }

    if (start >= end) {
        throw new ValidationError(
            "Start date must be before end date."
        );
    }

    let assignment: LoadedAssignment | null = null;

    if (data.eventType === EventType.LESSON) {

        assignment = await loadEventContext(data);

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
    }

    if (!data.roomId) {
        throw new ValidationError(
            "Room is required."
        );
    }

    await validateRoomConflict(
        data.roomId,
        start,
        end
    );

    const event = await prisma.event.create({
        data: {
            title: data.title,
            description: data.description,

            event_type: data.eventType,
            status: EventStatus.SCHEDULED,

            start_date: start,
            end_date: end,

            created_by: data.createdBy,

            class_id: assignment?.subject.class.class_id,
            subject_instructor_id: assignment?.subject_instructor_id,

            recurrence_id: data.recurrenceId,

            is_blocked: false
        }
    });

    await prisma.reservation.create({
        data: {
            room_id: data.roomId,
            event_id: event.event_id,
            description: data.description
        }
    });

    return event;
};


const checkClassAvailability = async (classId: number, start: Date, end: Date): Promise<boolean> => {
    const externalEvent = await prisma.event.findFirst({
        where: {
            class_id: classId,
            event_type: EventType.EXTERNAL,
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
): Promise<void> => {

    // return prisma.event.update({
    //     where: {
    //         event_id: eventId
    //     },
    //     data: {
    //         title: data.title,
    //         description: data.description,
    //         event_type_id: data.eventTypeId,
    //         subject_id: data.subjectId,
    //         class_id: data.classId
    //     }
    // });

}

export const deleteEvent = async (eventId: number): Promise<void> => {

    await prisma.event.delete({
        where: {
            event_id: eventId
        }
    });

}