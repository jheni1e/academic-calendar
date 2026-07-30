import { prisma } from "../lib/prisma.ts";
import { CreateEventDTO, EventResponseDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { Class, Event, EventStatus, EventType, ParticipationStatus, Prisma, Subject, SubjectInstructor, User } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { ValidationError } from "../shared/errors/ValidationError.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";
import { createReservation, updateReservationByEvent } from "./reservation.service.ts";
import { validateLessonEvent } from "./event/lesson.event.service.ts";
import { validateFeedbackEvent } from "./event/feedback.event.service.ts";
import { validateCreator, validateDates, validateEventDuration, validateRequiredFields, validateRoomRequirements } from "./event/event.validation.service.ts";
import { validateClassConflict, validateInstructorConflictById, validateRoomConflict } from "./event/event.conflict.service.ts";

export type LoadedAssignment = SubjectInstructor & {
    subject: Subject & {
        class: Class;
    };
    instructor: User;
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
    await validateRoomRequirements(data.roomId);

    let assignment: LoadedAssignment | null = null;
    let classId = data.classId;

    switch (data.eventType) {

        case EventType.LESSON: {
    
            const lesson = await validateLessonEvent(
                data,
                start,
                end
            );
    
            assignment = lesson.assignment;
            classId = lesson.classId;
            break;
        }
    
        case EventType.FEEDBACK: {
    
            await validateFeedbackEvent(
                data,
                start,
                end
            );
            break;
        }
    
        default:
            break;
    }

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

    if (classId) {

        const classUsers = await tx.classUser.findMany({
            where: {
                class_id: classId
            },
            select: {
                user_id: true
            }
        });

        if (classUsers.length > 0) {

            await tx.participation.createMany({
                data: classUsers.map(classUser => ({
                    event_id: event.event_id,
                    user_id: classUser.user_id,
                    status: ParticipationStatus.PENDING
                })),
                skipDuplicates: true
            });
        }
    }

    if (data.roomId) {

        await createReservation(
            tx,
            {
                roomId: data.roomId,
                eventId: event.event_id,
                startDate: start,
                endDate: end,
                description: data.description
            }
        );
    }

    return event;
    });

}

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

    await prisma.$transaction(async (tx) => {

        await tx.participation.deleteMany({
            where: {
                event_id: eventId
            }
        });

        await tx.reservation.deleteMany({
            where: {
                event_id: eventId
            }
        });

        await tx.event.delete({
            where: {
                event_id: eventId
            }
        });
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
