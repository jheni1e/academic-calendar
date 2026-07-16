import { prisma } from "../../../lib/prisma.ts";
import { IRoomRepository } from "./IRoomRepository.ts";
import { CreateRoomDTO, UpdateRoomDTO } from "../../../dtos/RoomDTO.ts";
import { Room } from "../../../generated/prisma/client.ts";

export class PrismaRoomRepository implements IRoomRepository {

    async create(data: CreateRoomDTO): Promise<Room> {
        return prisma.room.create({
            data: {
                title: data.title,
                capacity: data.capacity,
                description: data.description
            }
        });
    }

    async findById(roomId: number): Promise<Room | null> {
        return prisma.room.findUnique({
            where: {
                room_id: roomId
            }
        });
    }

    async findAll(): Promise<Room[]> {
        return prisma.room.findMany();
    }

    async update(
        roomId: number,
        data: UpdateRoomDTO
    ): Promise<Room> {

        return prisma.room.update({
            where: {
                room_id: roomId
            },
            data: {
                description: data.description
            }
        });
    }

    async delete(roomId: number): Promise<void> {
        await prisma.room.delete({
            where: {
                room_id: roomId
            }
        });
    }
}