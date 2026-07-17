import { EventRole } from "../../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { CreateEventRoleDTO, UpdateEventRoleDTO } from "../dtos/EventRoleDTO.ts";

export const createEventRole = async (
    data: CreateEventRoleDTO
): Promise<EventRole> => {

    return prisma.eventRole.create({
        data: {
            name: data.name
        }
    });
}

export const findEventRoleById = async (
    eventRoleId: number
): Promise<EventRole | null> => {

    return prisma.eventRole.findUnique({
        where: {
            event_role_id: eventRoleId
        }
    });
}

export const findAllEventRoles = async (): Promise<EventRole[]> => {

    return prisma.eventRole.findMany();
}

export const updateEventRole = async (
    eventRoleId: number,
    data: UpdateEventRoleDTO
): Promise<EventRole> => {

    return prisma.eventRole.update({
        where: {
            event_role_id: eventRoleId
        },
        data: {
            name: data.name
        }
    });
}

export const deleteEventRole = async(
    eventRoleId: number
): Promise<void> => {

    await prisma.eventRole.delete({
        where: {
            event_role_id: eventRoleId
        }
    });
}