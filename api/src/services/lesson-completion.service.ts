import { EventStatus, EventType } from "../generated/prisma/enums.ts";
import { prisma } from "../lib/prisma.ts";

export const completePendingLessons = async (): Promise<void> => {

    const lessons = await prisma.event.findMany({
        where: {
            event_type: EventType.LESSON,
            status: EventStatus.CONFIRMED,
            end_date: {
                lte: new Date()
            }
        },
        include: {
            subject_instructor: {
                include: {
                    subject: true
                }
            }
        }
    });

    if (lessons.length === 0) {
        return;
    }

    await prisma.$transaction(async (tx) => {

        for (const lesson of lessons) {

            if (!lesson.subject_instructor) {
                continue;
            }

            const durationHours =
                (lesson.end_date.getTime() -
                    lesson.start_date.getTime()) /
                (1000 * 60 * 60);

            // marca o evento como concluído
            await tx.event.update({
                where: {
                    event_id: lesson.event_id
                },
                data: {
                    status: EventStatus.COMPLETED
                }
            });

            // move horas de scheduled -> completed
            await tx.subject.update({
                where: {
                    subject_id: lesson.subject_instructor.subject.subject_id
                },
                data: {
                    scheduled_workload: {
                        decrement: durationHours
                    },
                    completed_workload: {
                        increment: durationHours
                    }
                }
            });
        }

    });

};