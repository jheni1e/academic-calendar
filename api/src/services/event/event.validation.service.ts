import { CreateEventDTO } from "../../dtos/EventDto.ts";
import { EventStatus, EventType } from "../../generated/prisma/enums.ts";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../../shared/errors/ConflictError.ts";
import { NotFoundError } from "../../shared/errors/NotFoundError.ts";
import { ValidationError } from "../../shared/errors/ValidationError.ts";
import { LoadedAssignment } from "./event.service.ts";
import { validateLessonUpdate } from "./lesson.event.service.ts";

const MAX_EVENT_DURATION_MINUTES = 9 * 60;

export const validateEventDuration = (
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

export const validateRequiredFields = (
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

export const validateDates = (
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

export const validateCreator = async (
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


export const validateRoomRequirements = async (
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

export interface UpdateValidationResult {
    assignment: LoadedAssignment | null;
    classId?: number;
}

export const validateUpdateEvent = async (
    eventId: number,
    eventType: EventType,
    subjectInstructorId: number | undefined,
    roomId: number | undefined,
    start: Date,
    end: Date
): Promise<UpdateValidationResult> => {

    validateDates(start, end);
    validateEventDuration(start, end);

    await validateRoomRequirements(roomId);

    if (eventType !== EventType.LESSON) {
        return {
            assignment: null
        };
    }

    if (!subjectInstructorId) {
        throw new ValidationError(
            "Subject instructor is required for lessons."
        );
    }

    const assignment = await validateLessonUpdate(
        eventId,
        subjectInstructorId,
        start,
        end,
        roomId
    );

    return {
        assignment,
        classId: assignment.subject.class_id
    };
};