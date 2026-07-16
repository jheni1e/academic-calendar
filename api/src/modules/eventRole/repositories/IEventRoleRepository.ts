import { EventRole } from "../../../generated/prisma/client.ts";
import {
    CreateEventRoleDTO,
    UpdateEventRoleDTO
} from "../../../dtos/EventRoleDTO.ts";

export interface IEventRoleRepository {

    create(
        data: CreateEventRoleDTO
    ): Promise<EventRole>;

    findById(
        eventRoleId: number
    ): Promise<EventRole | null>;

    findAll(): Promise<EventRole[]>;

    update(
        eventRoleId: number,
        data: UpdateEventRoleDTO
    ): Promise<EventRole>;

    delete(
        eventRoleId: number
    ): Promise<void>;
}