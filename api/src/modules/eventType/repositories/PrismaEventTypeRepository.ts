import { EventType } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";

import {
    CreateEventTypeDTO,
    UpdateEventTypeDTO
} from "../EventTypeDTO.ts";

import { IEventTypeRepository } from "./IEventTypeRepository.ts";

export class PrismaEventTypeRepository
    implements IEventTypeRepository {

    async create(
        data: CreateEventTypeDTO
    ): Promise<EventType> {

        return prisma.eventType.create({
            data: {
                name: data.name
            }
        });
    }

    async findById(
        eventTypeId: number
    ): Promise<EventType | null> {

        return prisma.eventType.findUnique({
            where: {
                event_type_id: eventTypeId
            }
        });
    }

    async findAll(): Promise<EventType[]> {

        return prisma.eventType.findMany();
    }

    async update(
        eventTypeId: number,
        data: UpdateEventTypeDTO
    ): Promise<EventType> {

        return prisma.eventType.update({
            where: {
                event_type_id: eventTypeId
            },
            data: {
                name: data.name
            }
        });
    }

    async delete(
        eventTypeId: number
    ): Promise<void> {

        await prisma.eventType.delete({
            where: {
                event_type_id: eventTypeId
            }
        });
    }
}