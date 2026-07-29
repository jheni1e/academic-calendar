import { CreateEventDTO } from "../../dtos/EventDto.ts";
import { EventType } from "../../generated/prisma/enums.ts";
import { ValidationError } from "../../shared/errors/ValidationError.ts";
import { LoadedAssignment, validateLesson } from "../event.service.ts";

export interface LessonValidationResult {
    assignment: LoadedAssignment;
    classId: number;
}

export const validateLessonEvent = async (
    data: CreateEventDTO,
    start: Date,
    end: Date
): Promise<LessonValidationResult> => {

    if (data.eventType !== EventType.LESSON) {
        throw new ValidationError(
            "Invalid event type for lesson validation."
        );
    }

    if (!data.subjectInstructorId) {
        throw new ValidationError(
            "Subject instructor is required for lessons."
        );
    }

    if (!data.roomId) {
        throw new ValidationError(
            "Room is required for lessons."
        );
    }

    const assignment = await validateLesson(
        data.subjectInstructorId,
        start,
        end
    );

    return {
        assignment,
        classId: assignment.subject.class_id
    };
};