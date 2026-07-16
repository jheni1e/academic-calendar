import { CreateEventDTO, UpdateEventDTO } from "../../../dtos/EventDto.ts";
import { Event } from "../../../generated/prisma/client.ts";

export interface IEventRepository {

    create(data: CreateEventDTO): Promise<Event>;

    findById(
        eventId: number
    ): Promise<Event | null>;

    findByClass(
        classId:number
    ): Promise<Event[]>

    findAll(): Promise<Event[]>;

    update(
        eventId: number,
        data: UpdateEventDTO
    ): Promise<Event>;

    delete(
        eventId: number
    ): Promise<void>;
}