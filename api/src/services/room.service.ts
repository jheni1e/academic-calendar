import { Room } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import { CreateRoomDTO, UpdateRoomDTO } from "../../modules/room/RoomDto.ts";

export const createRoom = async (data: CreateRoomDTO): Promise<Room> => {
    return prisma.room.create({
        data: {
            title: data.title,
            capacity: data.capacity,
            description: data.description
        }
    });
}

export const findRoomById = async (roomId: number): Promise<Room | null> => {
    return prisma.room.findUnique({
        where: {
            room_id: roomId
        }
    });
}

export const findAllRooms = async (): Promise<Room[]> => {
    return prisma.room.findMany();
}

export const updateRoom = async (
    roomId: number,
    data: UpdateRoomDTO
): Promise<Room> => {

    return prisma.room.update({
        where: {
            room_id: roomId
        },
        data: {
            description: data.description
        }
    });
}

export const deleteRoom = async (roomId: number): Promise<void> => {
    await prisma.room.delete({
        where: {
            room_id: roomId
        }
    });
}