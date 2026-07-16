import { EventType } from "../../../generated/prisma/client.ts";
import {
    CreateEventTypeDTO,
    UpdateEventTypeDTO
} from "../../../dtos/EventTypeDTO.ts";

export interface IEventTypeRepository {

    create(
        data: CreateEventTypeDTO
    ): Promise<EventType>;

    findById(
        eventTypeId: number
    ): Promise<EventType | null>;

    findAll(): Promise<EventType[]>;

    update(
        eventTypeId: number,
        data: UpdateEventTypeDTO
    ): Promise<EventType>;

    delete(
        eventTypeId: number
    ): Promise<void>;
}