import { ScheduleLessonsDTO } from "../dtos/SchedulerDto.ts";
import { EventType, Recurrence } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { createEvent, LoadedAssignment } from "./event.service.ts";
import { createRecurrence } from "./Recurrence.service.ts";

const LESSON_DURATION = 4;

const loadAssignment = async (
    subjectInstructorId: number
): Promise<LoadedAssignment> => {

    const assignment = await prisma.subjectInstructor.findUnique({
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

const createLessonRecurrence = async (
    data: ScheduleLessonsDTO
) => {

    return createRecurrence({
        ...data.recurrence,
        created_by: data.createdBy
    });

};

const hasReachedLimit = (
    recurrence: Recurrence,
    currentDate: Date,
    createdLessons: number
): boolean => {

    if (
        recurrence.occurrences &&
        createdLessons >= recurrence.occurrences
    )
        return true;
    
    if (
        recurrence.repeat_until &&
        currentDate > recurrence.repeat_until
    )
        return true;

    return false;
};

const isValidDay = (
    date: Date,
    recurrence: Recurrence
): boolean => {

    switch (date.getDay()) {

        case 1:
            return recurrence.monday;

        case 2:
            return recurrence.tuesday;

        case 3:
            return recurrence.wednesday;

        case 4:
            return recurrence.thursday;

        case 5:
            return recurrence.friday;

        default:
            return false;
    }
};

const buildLessonDates = (
    date: Date,
    startHour: string,
    endHour: string
): {
    startDate: Date;
    endDate: Date;
} => {

    const startDate = new Date(date);
    const endDate = new Date(date);

    const [startH, startM] =
        startHour.split(":").map(Number);

    const [endH, endM] =
        endHour.split(":").map(Number);

    startDate.setHours(startH, startM, 0, 0);
    endDate.setHours(endH, endM, 0, 0);

    return {
        startDate,
        endDate
    };
};

const updateWorkload = async (
    subjectId: number,
    completedHours: number
): Promise<void> => {

    await prisma.subject.update({
        where: {
            subject_id: subjectId
        },
        data: {
            completed_workload: {
                increment: completedHours
            }
        }
    });

};

const addDays = (
    date: Date,
    days: number
): Date => {

    const next = new Date(date);

    next.setDate(next.getDate() + days);

    return next;
};

const createLesson = async (
    data: ScheduleLessonsDTO,
    assignment: LoadedAssignment,
    recurrence: Recurrence,
    lessonNumber: number,
    startDate: Date,
    endDate: Date
):  Promise<void> => {

    await createEvent({
        title: `${assignment.subject.name} - Aula ${lessonNumber}`,
        description: data.description,

        eventType: EventType.LESSON,

        createdBy: data.createdBy,

        subjectInstructorId:
            assignment.subject_instructor_id,

        recurrenceId:
            recurrence.recurrence_id,

        roomId: data.roomId,

        startDate,
        endDate
    });

};

export const scheduleLessonSeries = async (
    data: ScheduleLessonsDTO
): Promise<void> => {

    // await prisma.$transaction(async (tx) => { 
    // }

    const assignment = await loadAssignment(
        data.subjectInstructorId
    );

    const recurrence = await createLessonRecurrence(data);

    const subject = assignment.subject;

    let remainingHours =
        subject.workload -
        subject.completed_workload;

    let lessonNumber =
        (subject.completed_workload / LESSON_DURATION) + 1;

    let currentDate = new Date(data.startDate);

    let createdLessons = 0;

    if (subject.workload <= subject.completed_workload) {
        return;
    }

    while (remainingHours >= LESSON_DURATION) {

        if (hasReachedLimit(recurrence, currentDate, createdLessons))
            break;
    
        if (!isValidDay(currentDate, recurrence)) {
            currentDate = addDays(currentDate, 1);
            continue;
        }
    
        const { startDate, endDate } =
            buildLessonDates(
                currentDate,
                data.startHour,
                data.endHour
            );
    
        try {
    
            await createLesson(
                data,
                assignment,
                recurrence,
                lessonNumber,
                startDate,
                endDate
            );
    
            createdLessons++;
            lessonNumber++;
            remainingHours -= LESSON_DURATION;
    
        }
        catch (error) {
    
            if (error instanceof ConflictError) {
                currentDate = addDays(currentDate, 1);
                continue;
            }
    
            throw error;
        }
    
        currentDate = addDays(currentDate, 1);
    }

    await updateWorkload(
        subject.subject_id,
        createdLessons * LESSON_DURATION
    );
};