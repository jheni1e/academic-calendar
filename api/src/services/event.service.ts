import { prisma } from "../lib/prisma.ts";
import { CreateEventDTO, EventResponseDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { Class, Event, EventStatus, EventType, ParticipationStatus, Prisma, Subject, SubjectInstructor, User } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { ValidationError } from "../shared/errors/ValidationError.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";
import { createReservation, updateReservationByEvent } from "./reservation.service.ts";
import { BadRequestError } from "../shared/errors/BadRequestError.ts";
import { validateLessonEvent } from "./event/lesson.event.service.ts";

const validateDates = (
    start: Date,
    end: Date
): void => {

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new ValidationError(
            "Invalid date format."
        );
    }

    if (start >= end) {
        throw new ValidationError(
            "Start date must be before end date."
        );
    }

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

const validateInstructorConflictById = async (
    instructorId: number,
    start: Date,
    end: Date,
    ignoreEventId: number
): Promise<void> => {

    const conflict = await prisma.event.findFirst({
        where: {
            event_id: { not: ignoreEventId },

            status: EventStatus.SCHEDULED,

            start_date: { lt: end },
            end_date: { gt: start },

            subject_instructor: {
                instructor_id: instructorId
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
    end: Date,
    ignoreEventId: number
): Promise<void> => {

    const conflict = await prisma.event.findFirst({
        where: {
            event_id: { not: ignoreEventId },

            class_id: classId,
            status: EventStatus.SCHEDULED,

            start_date: { lt: end },
            end_date: { gt: start }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Class already has a scheduled event during this period."
        );
    }
};

const validateUserConflict = async (
    userId: number,
    start: Date,
    end: Date,
    currentEventId?: number
): Promise<void> => {

    const conflict = await prisma.participation.findFirst({
        where: {
            user_id: userId,
            status: ParticipationStatus.CONFIRMED,

            event: {
                status: EventStatus.SCHEDULED,

                ...(currentEventId && {
                    event_id: {
                        not: currentEventId
                    }
                }),

                start_date: {
                    lt: end
                },

                end_date: {
                    gt: start
                }
            }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "User already has another confirmed event during this period."
        );
    }
};

// --- HELPERS ---

const createEventRecord = async (
    tx: Prisma.TransactionClient,
    data: CreateEventDTO,
    assignment: LoadedAssignment | null,
    classId: number | undefined,
    start: Date,
    end: Date
): Promise<Event> => {

    return tx.event.create({
        data: {
            title: data.title,
            description: data.description,

            event_type: data.eventType,
            status: EventStatus.SCHEDULED,

            start_date: start,
            end_date: end,

            created_by: data.createdBy,

            class_id: classId,

            subject_instructor_id:
                assignment?.subject_instructor_id,

            recurrence_id:
                data.recurrenceId,

            is_blocked: false
        }
    });

};

const validateRoomConflict = async (
    roomId: number,
    start: Date,
    end: Date,
    ignoreEventId: number
): Promise<void> => {

    const conflict = await prisma.event.findFirst({
        where: {
            event_id: { not: ignoreEventId },

            reservation: {
                is: {
                    room_id: roomId
                }
            },

            status: EventStatus.SCHEDULED,

            start_date: { lt: end },
            end_date: { gt: start }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Room already has another event scheduled during this period."
        );
    }
};

export const validateLesson = async (
    subjectInstructorId: number,
    start: Date,
    end: Date
): Promise<LoadedAssignment> => {

    const assignment = await loadAssignment(
        subjectInstructorId
    );

    validateSubjectWorkload(assignment);

    await validateInstructorConflictById(
        assignment.instructor.user_id,
        start,
        end,
        0 
        );

    await validateClassConflict(
        assignment.subject.class.class_id,
        start,
        end,
        0
    );

    return assignment;
};

const validateLessonUpdate = async (
    eventId: number,
    subjectInstructorId: number,
    start: Date,
    end: Date,
    roomId?: number
): Promise<LoadedAssignment> => {

    const assignment = await loadAssignment(subjectInstructorId);

    validateSubjectWorkload(assignment);

    await validateInstructorConflictById(
        assignment.instructor.user_id,
        start,
        end,
        eventId
    );

    await validateClassConflict(
        assignment.subject.class.class_id,
        start,
        end,
        eventId
    );

    if (roomId) {
        await validateRoomConflict(
            roomId,
            start,
            end,
            eventId
        );
    }

    return assignment;
};

const MAX_EVENT_DURATION_MINUTES = 9 * 60;

const validateEventDuration = (
    start: Date,
    end: Date
): void => {

    const duration =
        (end.getTime() - start.getTime()) / 60000;

    if (duration > MAX_EVENT_DURATION_MINUTES) {
        throw new ValidationError(
            "Event duration cannot exceed 9 hours."
        );
    }
};

const validateRoomRequirements = async (
    roomId?: number
): Promise<void> => {

    if (!roomId) {
        return;
    }

    const room = await prisma.room.findUnique({
        where: {
            room_id: roomId
        }
    });

    if (!room) {
        throw new NotFoundError(
            "Room not found."
        );
    }

    if (!room.is_active) {
        throw new ValidationError(
            "Room is inactive."
        );
    }
};

const validateCreator = async (
    userId: number
): Promise<void> => {

    const creator = await prisma.user.findUnique({
        where: {
            user_id: userId
        }
    });

    if (!creator) {
        throw new NotFoundError(
            "Creator not found."
        );
    }
};

const validateRequiredFields = (
    data: CreateEventDTO
): void => {
    if (!data.title || data.title.trim() === "") {
        throw new ValidationError(
            "Event title is required."
        );
    }

    if (!data.eventType) {
        throw new ValidationError(
            "Event type is required."
        );
    }

    if (!data.createdBy) {
        throw new ValidationError(
            "Creator is required."
        );
    }

    if (!data.startDate || !data.endDate) {
        throw new ValidationError(
            "Start date and end date are required."
        );
    }
}

export const createEvent = async (
    data: CreateEventDTO
): Promise<Event> => {

    // --- Required fields ---
    validateRequiredFields(data)

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    // --- Date, EventDuration, Creator Validations ---
    validateDates(start, end);
    validateEventDuration(start, end);
    await validateCreator(data.createdBy);

    let assignment: LoadedAssignment | null = null;
    let classId = data.classId;

    if (data.eventType === EventType.LESSON) {

        const lesson = await validateLessonEvent(
            data,
            start,
            end
        );

        assignment = lesson.assignment;
        classId = lesson.classId;
    }

    // --- Lesson Validation ---
    // if (data.eventType === EventType.LESSON) {

    //     if (!data.subjectInstructorId) {
    //         throw new ValidationError(
    //             "Subject instructor is required for lessons."
    //         );
    //     }

    //     if (!data.roomId) {
    //         throw new ValidationError(
    //             "Room is required for lessons."
    //         );
    //     }

    //     assignment = await validateLesson(
    //         data.subjectInstructorId,
    //         start,
    //         end
    //     );
    //     classId = assignment.subject.class_id;
    // }

    // --- Room Validation ---
    await validateRoomRequirements(data.roomId);

    return prisma.$transaction(async (tx) => {

        const event = await createEventRecord(
            tx,
            data,
            assignment,
            classId,
            start,
            end
        );
    
        if (data.roomId) {
            
            await createReservation(
            tx,
            {
                roomId: data.roomId,
                eventId: event.event_id,
                startDate: start,
                endDate: end,
                description: data.description
            });
        }
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

export const findAllEvents = async (): Promise<EventResponseDTO[]> => {

    return prisma.event.findMany({
        orderBy: {
            start_date: "asc"
        },
        select: {
            event_id: true,
            title: true,
            description: true,
            start_date: true,
            end_date: true,
            event_type: true,
            status: true,
            is_blocked: true,
    
            class: {
                select: {
                    class_id: true,
                    name: true
                }
            },
    
            recurrence: {
                select: {
                    recurrence_id: true,
                    series_name: true,
                    repeat_until: true,
                    occurrences: true,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true
                }
            },
    
            reservation: {
                select: {
                    room: {
                        select: {
                            room_id: true,
                            title: true,
                            capacity: true
                        }
                    }
                }
            },
    
            subject_instructor: {
                select: {
                    subject: {
                        select: {
                            subject_id: true,
                            name: true
                        }
                    },
                    instructor: {
                        select: {
                            user_id: true,
                            user_edv: true,
                            name: true,
                            role: true
                        }
                    }
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

export const findEventsByRoom = async (
    roomId: number
): Promise<Event[]> => {
    return prisma.event.findMany({
        where: {
            reservation: {
                is: {
                    room_id: roomId
                }
            }
        },
        orderBy: {
            start_date: "asc"
        }
    });
};

export const findEventsByUser = async (
    userId: number
): Promise<Event[]> => {

    return prisma.event.findMany({
        where: {
            participations: {
                some: {
                    user_id : userId
                }
            }
        },
        
        include:  {
            class: true,
            reservation: {
                include: {
                    room: true
                }
            }
        },
        
        orderBy: {
            start_date: "asc"
        }
    });

};

export const updateEvent = async (
    eventId: number,
    data: UpdateEventDTO
): Promise<Event> => {

    const event = await prisma.event.findUnique({
        where: {
            event_id: eventId
        },
        select: {
            subject_instructor: {
                select: {
                    instructor_id: true
                }
            },
            reservation: {
                select: {
                    room: true
                }
            },
            class_id: true
        }
    });

    if (!event) {
        throw new NotFoundError("Event not found.");
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    validateDates(start, end);

    const durationMinutes = (end.getTime() - start.getTime()) / 60000;

    const MAX_DURATION_MINUTES = 9 * 60;

    if (durationMinutes > MAX_DURATION_MINUTES) {
        throw new ValidationError(
            "Event duration cannot exceed 9 hours."
        );
    }

    if (event.class_id) {
        await validateClassConflict(
            event.class_id,
            start,
            end,
            eventId
        );
    }

    if (event.subject_instructor) {
        await validateInstructorConflictById(
            event.subject_instructor.instructor_id,
            start,
            end,
            eventId
        );
    }

    const roomId =
        data.roomId ??
        event.reservation?.room.room_id;

    if (roomId) {
        await validateRoomConflict(
            roomId,
            start,
            end,
            eventId
        );
    }

    return prisma.$transaction(async (tx) => {

        const updatedEvent = await tx.event.update({
            where: {
                event_id: eventId
            },
            data: {
                title: data.title,
                description: data.description,

                start_date: start,
                end_date: end
            }
        });

        if (roomId) {
            await updateReservationByEvent(eventId, {
                roomId,
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

export const blockEvent = async (
    eventId : number
) : Promise<void> => {

    await prisma.event.update({
        where: {
            event_id: eventId
        },
        data: {
            is_blocked: true
        }
    });
}

export const unblockEvent = async (
    eventId : number
) : Promise<void> => {

    await prisma.event.update({
        where: {
            event_id: eventId
        },
        data: {
            is_blocked: false
        }
    });
}

export const confirmEvent = async (
    eventId : number
) : Promise<void> => {
    
    await prisma.event.update({
        where: {
            event_id: eventId
        },
        data: {
            status: "CONFIRMED"
        }
    })
}

export const cancelEvent = async (
    eventId : number
) : Promise<void> => {

    await prisma.event.update({
        where: {
            event_id: eventId
        },
        data: {
            status: "CANCELLED"
        }
    })
}
