import { prisma } from "../lib/prisma.ts";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { Class, Event, EventStatus, EventType, Subject, SubjectInstructor, User } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { ValidationError } from "../shared/errors/ValidationError.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";

// validateDates()

// loadAssignment()

// validateSubjectWorkload()

// validateInstructorConflict()

// validateClassConflict()

// validateRoomConflict()

// ----------
// helpers

// createReservation()

// createEventRecord()

// createEvent()

// ---------

// findEvent...

// updateEvent...

// deleteEvent...

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
            "Room already has a scheduled reservation during this period."
        );
    }
};

// --- HELPERS ---

const createReservation = async (
    roomId: number,
    eventId: number,
    description?: string
): Promise<void> => {

    await prisma.reservation.create({
        data: {
            room_id: roomId,
            event_id: eventId,
            description
        }
    });

};

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

export const createEvent = async (
    data: CreateEventDTO
): Promise<Event> => {

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    validateDates(start, end);

    let assignment: LoadedAssignment | null = null;

    if (data.eventType === EventType.LESSON) {

        assignment = await loadAssignment(
            data.subjectInstructorId
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

    const event = await createEventRecord(
        data,
        assignment,
        start,
        end
    );

    await createReservation(
        data.roomId,
        event.event_id,
        data.description
    );

    return event;
};