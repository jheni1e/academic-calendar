import { EventResponseDTO } from "../dtos/EventDto.ts";
import { CreateRoomDTO, UpdateRoomDTO } from "../dtos/RoomDto.ts";
import { Room } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";

 
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

export const disableRoom = async (roomId : number) : Promise<void> => {
    await prisma.room.update({
        where: {
            room_id: roomId
        },

        data: {
            is_active : false
        }
    })
}

export const getEventsByRoom = async (
    roomId: number
): Promise<EventResponseDTO[]> => {

    const room = await prisma.room.findUnique({
        where: {
            room_id: roomId
        },
        include: {
            reservations: {
                include: {
                    event: true
                }
            }
        }
    });

    if (!room) {
        return [];
    }

    return room.reservations.map(reservation => ({
        id: reservation.event.event_id,
        title: reservation.event.title,
        description: reservation.event.description,
        startDate: reservation.event.start_date,
        endDate: reservation.event.end_date,
        status: reservation.event.status
    }));
}
