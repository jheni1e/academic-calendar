import { CreateEventDTO } from "../../dtos/EventDto.ts";
import { EventType } from "../../generated/prisma/enums.ts";
import { ValidationError } from "../../shared/errors/ValidationError.ts";

const MAX_FEEDBACK_DURATION_HOURS = 2;

export const validateFeedbackEvent = async (
    data: CreateEventDTO,
    start: Date,
    end: Date
): Promise<void> => {

    if (data.eventType !== EventType.FEEDBACK) {
        throw new ValidationError(
            "Invalid event type for feedback validation."
        );
    }

    const duration =
        end.getTime() - start.getTime();

    if (duration > MAX_FEEDBACK_DURATION_HOURS * 60 * 60 * 1000) {
        throw new ValidationError(
            "Feedback events cannot be longer than 2 hours."
        );
    }

    if (duration <= 0) {
        throw new ValidationError(
            "Invalid feedback duration."
        );
    }
};