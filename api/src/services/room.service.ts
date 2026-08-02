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
      description: data.description,
    },
  });
};

export const findRoomById = async (roomId: number): Promise<Room | null> => {
  return prisma.room.findUnique({
    where: {
      room_id: roomId,
    },
  });
};

export const findAllRooms = async (): Promise<Room[]> => {
  return prisma.room.findMany();
};

export const updateRoom = async (
  roomId: number,
  data: UpdateRoomDTO,
): Promise<Room> => {
  return prisma.room.update({
    where: {
      room_id: roomId,
    },
    data: {
      description: data.description,
    },
  });
};

export const deleteRoom = async (roomId: number): Promise<void> => {
  await prisma.room.delete({
    where: {
      room_id: roomId,
    },
  });
};

export const disableRoom = async (roomId: number): Promise<void> => {
  await prisma.room.update({
    where: {
      room_id: roomId,
    },

    data: {
      is_active: false,
    },
  });
};

export const getEventsByRoom = async (
  roomId: number,
): Promise<EventResponseDTO[]> => {
  return prisma.event.findMany({
    where: {
      reservation: {
        room_id: roomId,
      },
    },

    orderBy: {
      start_date: "asc",
    },

    select: {
      event_id: true,
      title: true,
      description: true,
      start_date: true,
      end_date: true,
      event_type: true,
      status: true,
      is_blocked: true,

      class: {
        select: {
          class_id: true,
          name: true,
        },
      },

      recurrence: {
        select: {
          recurrence_id: true,
          series_name: true,
          repeat_until: true,
          occurrences: true,
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
        },
      },

      reservation: {
        select: {
          room: {
            select: {
              room_id: true,
              title: true,
              capacity: true,
            },
          },
        },
      },

      subject_instructor: {
        select: {
          subject: {
            select: {
              subject_id: true,
              name: true,
            },
          },

          instructor: {
            select: {
              user_id: true,
              user_edv: true,
              name: true,
              role: true,
            },
          },
        },
      },

      participations: {
        select: {
          participation_id: true,
          status: true,

          user: {
            select: {
              user_id: true,
              name: true,
              user_edv: true,
            },
          },
        },
      },

      creator: {
        select: {
          user_id: true,
          name: true,
          user_edv: true,
        },
      },
    },
  });
};
