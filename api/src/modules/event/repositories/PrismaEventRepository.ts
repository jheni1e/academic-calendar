import { Event } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";

import { CreateEventDTO, UpdateEventDTO } from "../EventDto.ts";
import { IEventRepository } from "./IEventRepository.ts";

export class PrismaEventRepository implements IEventRepository {

    async create(data: CreateEventDTO): Promise<Event> {

        return prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                event_type_id: data.eventTypeId,
                subject_id: data.subjectId,
                class_id: data.classId,
                created_by: data.createdBy
            }
        });

    }

    async findById(eventId: number): Promise<Event | null> {

        return prisma.event.findUnique({
            where: {
                event_id: eventId
            }
        });

    }
    
    async findByClass(classId: number): Promise<Event[]> {

        return prisma.event.findMany({
            where: {
                class_id: classId
            }
        });

    }

    async findAll(): Promise<Event[]> {

        return prisma.event.findMany();

    }

    async update(
        eventId: number,
        data: UpdateEventDTO
    ): Promise<Event> {

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

    async delete(eventId: number): Promise<void> {

        await prisma.event.delete({
            where: {
                event_id: eventId
            }
        });

    }

}