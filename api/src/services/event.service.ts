import { prisma } from "../lib/prisma.ts";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { Event } from "../generated/prisma/client.ts";
import { findSubjectById } from "./subject.service.ts";
import { findClassById } from "./class.service.ts";

export const createEvent = async (data: CreateEventDTO): Promise<void> => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    // const conflictingEvents = await prisma.event.findMany({
    //     where: {
    //         start_date: {
    //             lte: end,
    //         },
    //         end_date: {
    //             gte: start,
    //         }
    //     },
    // });

    // if (conflictingEvents.length > 0) {
    //     for (const event of conflictingEvents) {
    //         // if (event.event_type_id === "lesson" && event.subject_id) {
    //         //     await prisma.subject.update({
    //         //         where: {
    //         //             subject_id: event.subject_id,
    //         //         },
    //         //         data: {
    //         //             workload: {
    //         //                 increment: 4,
    //         //             },
    //         //         },
    //         //     });
    //         }

    //         // const id = event.event_id;

            await deleteEvent(id);
        }
    }

    // return prisma.event.create({
    //     data: {
    //         title: data.title,
    //         description: data.description,
    //         event_type_id: data.eventTypeId,
    //         subject_id: data.subjectId,
    //         class_id: data.classId,
    //         created_by: data.createdBy
    //     }
    // });
}

export const findEventById = async (eventId: number): Promise<Event | null> => {

    return prisma.event.findUnique({
        where: {
            event_id: eventId
        }
    });

}

export const findEventByClass = async (classId: number): Promise<Event[]> => {

    return prisma.event.findMany({
        where: {
            class_id: classId
        }
    });

}

export const findAllEvents = async (): Promise<Event[]> => {

    return prisma.event.findMany();

}

export const updateEvent = async (
    eventId: number,
    data: UpdateEventDTO
): Promise<Event> => {

    return prisma.event.update({
        where: {
            event_id: eventId
        },
        data: {
            title: data.title,
            description: data.description,
            event_type_id: data.eventTypeId,
            subject_id: data.subjectId,
            class_id: data.classId
        }
    });

}

export const deleteEvent = async (eventId: number): Promise<void> => {

    await prisma.event.delete({
        where: {
            event_id: eventId
        }
    });

}