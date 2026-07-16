import { EventRole } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";

import {
    CreateEventRoleDTO,
    UpdateEventRoleDTO
} from "../../../dtos/EventRoleDTO.ts";

import { IEventRoleRepository } from "./IEventRoleRepository.ts";

export class PrismaEventRoleRepository
    implements IEventRoleRepository {

    async create(
        data: CreateEventRoleDTO
    ): Promise<EventRole> {

        return prisma.eventRole.create({
            data: {
                name: data.name
            }
        });
    }

    async findById(
        eventRoleId: number
    ): Promise<EventRole | null> {

        return prisma.eventRole.findUnique({
            where: {
                event_role_id: eventRoleId
            }
        });
    }

    async findAll(): Promise<EventRole[]> {

        return prisma.eventRole.findMany();
    }

    async update(
        eventRoleId: number,
        data: UpdateEventRoleDTO
    ): Promise<EventRole> {

        return prisma.eventRole.update({
            where: {
                event_role_id: eventRoleId
            },
            data: {
                name: data.name
            }
        });
    }

    async delete(
        eventRoleId: number
    ): Promise<void> {

        await prisma.eventRole.delete({
            where: {
                event_role_id: eventRoleId
            }
        });
    }
}