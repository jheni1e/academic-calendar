import { EventType } from "../../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { CreateEventTypeDTO, UpdateEventTypeDTO } from "../dtos/EventTypeDto.ts";

export const createEventType = async (
    data: CreateEventTypeDTO
): Promise<EventType> => {

    return prisma.eventType.create({
        data: {
            name: data.name
        }
    });
}

export const findEventTypeById = async (
    eventTypeId: number
): Promise<EventType | null> => {

    return prisma.eventType.findUnique({
        where: {
            event_type_id: eventTypeId
        }
    });
}

export const findEventTypeByUser = async(userId: number): Promise<EventType[]> => {
    const user = await prisma.user.findUnique({
        where: {
            user_id: userId
        }
    });

    if (user.role === "apprentice") {
        return prisma.eventType.findMany({
            where: {
                name: {
                    in: ["personal", "external"],
                },
            },
        });
    }

    return prisma.eventType.findMany();
}

export const findAllEventTypes = async (): Promise<EventType[]> {

    return prisma.eventType.findMany();
}

export const updateEventType = async (
    eventTypeId: number,
    data: UpdateEventTypeDTO
): Promise<EventType> => {

    return prisma.eventType.update({
        where: {
            event_type_id: eventTypeId
        },
        data: {
            name: data.name
        }
    });
}

export const deleteEventType = async (
    eventTypeId: number
): Promise<void> => {

    await prisma.eventType.delete({
        where: {
            event_type_id: eventTypeId
        }
    });
}