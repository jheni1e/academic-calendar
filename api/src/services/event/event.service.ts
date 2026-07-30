import { prisma } from "../../lib/prisma.ts";
import { CreateEventDTO, UpdateEventDTO } from "../../dtos/EventDto.ts";
import { Class, Event, EventStatus, EventType, ParticipationStatus, Prisma, Subject, SubjectInstructor, User } from "../../generated/prisma/client.ts";
import { NotFoundError } from "../../shared/errors/NotFoundError.ts";
import { ValidationError } from "../../shared/errors/ValidationError.ts";
import { createReservation, updateReservationByEvent } from "../reservation.service.ts";
import { validateLessonEvent } from "./lesson.event.service.ts";
import { validateFeedbackEvent } from "./feedback.event.service.ts";
import { validateCreator, validateDates, validateEventDuration, validateRequiredFields, validateRoomRequirements, validateUpdateEvent } from "./event.validation.service.ts";
import { findEventById } from "./event.query.service.ts";

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

export const updateEvent = async (
    eventId: number,
    data: UpdateEventDTO
): Promise<Event> => {
    const event = await findEventById(eventId);

    if (!event) {
        throw new NotFoundError("Event not found.");
    }
    
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (!data.eventType) {
        throw new ValidationError(
            "Event type is required."
        );
    }
    
    const validation = await validateUpdateEvent(
        eventId,
        data.eventType,
        data.subjectInstructorId,
        data.roomId,
        start,
        end
    );
    
    return prisma.$transaction(async (tx) => {

        const updatedEvent = await tx.event.update({
            where: {
                event_id: eventId
            },
            data: {
                title: data.title,
                description: data.description,
                event_type: data.eventType,

                start_date: start,
                end_date: end,

                class_id: validation.classId,
                subject_instructor_id:
                    validation.assignment?.subject_instructor_id,

                recurrence_id: data.recurrenceId
            }
        });

        const roomIdWasSent =
            Object.prototype.hasOwnProperty.call(data, "roomId");

        if (roomIdWasSent) {

            if (data.roomId) {

                await updateReservationByEvent(eventId, {
                    roomId: data.roomId,
                    startDate: start,
                    endDate: end,
                    description: data.description
                });

            } else {

                await tx.reservation.deleteMany({
                    where: {
                        event_id: eventId
                    }
                });
            }
        }

    return updatedEvent;
})};

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
