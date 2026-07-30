import { CreateEventDTO } from "../../dtos/EventDto.ts";
import { EventType } from "../../generated/prisma/enums.ts";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../../shared/errors/ConflictError.ts";
import { NotFoundError } from "../../shared/errors/NotFoundError.ts";
import { ValidationError } from "../../shared/errors/ValidationError.ts";
import { LoadedAssignment } from "../event.service.ts";
import {
    validateInstructorConflictById,
    validateClassConflict,
    validateRoomConflict
} from "./event.conflict.service.ts";

export interface LessonValidationResult {
    assignment: LoadedAssignment;
    classId: number;
}

const LESSON_DURATION = 4;

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

// ------- CONFLICTS ---------

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

export const validateLessonUpdate = async (
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