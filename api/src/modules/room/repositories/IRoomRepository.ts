import { Room } from "../../../generated/prisma/client.ts";
import { CreateRoomDTO, UpdateRoomDTO } from "../RoomDto.ts";

export interface IRoomRepository {
    create(data: CreateRoomDTO): Promise<Room>;

    findById(
        roomId: number
    ): Promise<Room | null>;

    findAll(): Promise<Room[]>;

    update(
        roomId: number,
        data: UpdateRoomDTO
    ): Promise<Room>;

    delete(
        roomId: number
    ): Promise<void>;
}