import { Room } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { IRoomRepository } from "./IRoomRepository.ts";
import { CreateRoomDTO } from "../RoomDto.ts";

export class PrismaRoomRepository implements IRoomRepository {

    async create(data: CreateRoomDTO): Promise<Room> {
        return prisma.room.create({
            data: {
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