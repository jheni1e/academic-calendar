import { EventStatus } from "../../generated/prisma/enums.ts";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../../shared/errors/ConflictError.ts";

export const validateInstructorConflictById = async (
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

export const validateClassConflict = async (
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

export const validateRoomConflict = async (
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