import { CreateLessonSeriesDTO, ScheduleLessonsDTO } from "../dtos/SchedulerDto.ts";
import { prisma } from "../lib/prisma.ts";
import { createEvent } from "./event.service.ts";

const LESSON_DURATION = 4;
export const scheduleLessons = async (
    data: ScheduleLessonsDTO
) => {

    const recurrence = await prisma.recurrence.findUnique({
        where: {
            recurrence_id: data.recurrenceId
        }
    });

    if (!recurrence) {
        throw new Error("Recurrence not found.");
    }

    const subjectInstructor =
        await prisma.subjectInstructor.findUnique({
            where: {
                subject_instructor_id: data.subjectInstructorId
            },
            include: {
                subject: true
            }
        });

    if (!subjectInstructor) {
        throw new Error("Subject assignment not found.");
    }

    // Implement choice between workload and repeat_until
    let remainingHours =
        subjectInstructor.subject.workload -
        subjectInstructor.subject.completed_workload;

    let lessonNumber =
        subjectInstructor.subject.completed_workload /
        LESSON_DURATION + 1;

    let currentDate = new Date(data.startDate);
    let createdLessons = 0;

    while (remainingHours >= LESSON_DURATION) {

        if (recurrence.repeat_until &&
            currentDate > recurrence.repeat_until) {
            break;
        }

        if (
            recurrence.occurrences &&
            createdLessons >= recurrence.occurrences
        ) {
            break;
        }

        const weekDay = currentDate.getDay();

        const validDay =
            (weekDay === 1 && recurrence.monday) ||
            (weekDay === 2 && recurrence.tuesday) ||
            (weekDay === 3 && recurrence.wednesday) ||
            (weekDay === 4 && recurrence.thursday) ||
            (weekDay === 5 && recurrence.friday);

        if (!validDay) {
            currentDate = addDays(currentDate, 1);
            continue;
        }

        const startDate = buildDate(
            currentDate,
            data.startHour
        );

        const endDate = buildDate(
            currentDate,
            data.endHour
        );

        const conflict = await prisma.event.findFirst({
            where: {
                class_id: data.classId,

                start_date: {
                    lt: endDate
                },

                end_date: {
                    gt: startDate
                }
            }
        });

        if (conflict) {
            currentDate = addDays(currentDate, 1);
            continue;
        }

        await createEvent({
            title: `${data.title} - Aula ${lessonNumber}`,
            description: data.description,

            classId: data.classId,
            createdBy: data.createdBy,

            subjectInstructorId:
                data.subjectInstructorId,

            recurrenceId: data.recurrenceId,

            starDate: startDate,
            endDate: endDate,

            eventType: "LESSON"
        });

        createdLessons++;
        lessonNumber++;
        remainingHours -= LESSON_DURATION;

        currentDate = addDays(currentDate, 1);
    }

    await prisma.subject.update({
        where: {
            subject_id: subjectInstructor.subject.subject_id
        },
        data: {
            completed_workload: {
                increment:
                    createdLessons * LESSON_DURATION
            }
        }
    });
};

function buildDate(
    date: Date,
    hour: string
): Date {

    const [h, m] = hour.split(":").map(Number);

    const newDate = new Date(date);

    newDate.setHours(h);
    newDate.setMinutes(m);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
}