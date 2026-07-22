import { CreateReservationDTO, UpdateReservationDTO } from "../dtos/ReservationDto.ts";
import { EventStatus, Prisma, Reservation } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";

const validateRoomConflict = async (
    roomId: number,
    start: Date,
    end: Date,
    reservationId?: number
): Promise<void> => {

    const conflict = await prisma.reservation.findFirst({
        where: {
            room_id: roomId,
        
            ...(reservationId && {
                reservation_id: {
                    not: reservationId
                }
            }),
        
            event: {
                status: EventStatus.SCHEDULED,
        
                start_date: {
                    lt: end
                },
        
                end_date: {
                    gt: start
                }
            }
        }
    });

    if (conflict) {
        throw new ConflictError(
            "Room already has a scheduled reservation during this period."
        );
    }
};

export const createReservation = async (
    data: CreateReservationDTO
): Promise<Reservation> => {
   

    await validateRoomConflict(
        data.roomId,
        data.startDate,
        data.endDate
    );

    return prisma.reservation.create({
        data: {
            room_id: data.roomId,
            event_id: data.eventId,
            description: data.description
        }
    });
};

export const updateReservation = async (
    reservationId: number,
    data: UpdateReservationDTO
): Promise<Reservation> => {

    if (
        data.roomId &&
        data.startDate &&
        data.endDate
    ) {
        await validateRoomConflict(
            data.roomId,
            data.startDate,
            data.endDate,
            reservationId
        );
    }

    return prisma.reservation.update({
        where: {
            reservation_id: reservationId
        },
        data: {
            room_id: data.roomId,
            event_id: data.eventId,
            description: data.description
        }
    });
};

export const updateReservationByEvent = async (
    eventId: number,
    data: UpdateReservationDTO
): Promise<Reservation> => {

    const reservation = await prisma.reservation.findUnique({
        where: {
            event_id: eventId
        }
    });

    if (!reservation) {
        throw new NotFoundError("Reservation not found");
    }

    if (
        data.roomId &&
        data.startDate &&
        data.endDate
    ) {
        await validateRoomConflict(
            data.roomId,
            data.startDate,
            data.endDate,
            reservation.reservation_id
        );
    }

    return prisma.reservation.update({
        where: {
            event_id: eventId
        },
        data: {
            room_id: data.roomId,
            description: data.description
        }
    });
};

export const findAllReservations = async (): Promise<Reservation[]> => {
    return prisma.reservation.findMany();
}

export const findReservationById = async (reservationId: number): Promise<Reservation | null> => {
    return prisma.reservation.findUnique({
        where: {
            reservation_id : reservationId
        }
    });
};

export const findReservationByEvent = async (
    eventId: number
): Promise<Reservation | null> => {

    return prisma.reservation.findUnique({
        where: {
            event_id: eventId
        }
    });

};

export const findReservationsByRoom = async (roomId : number) : Promise<Reservation[] > => {
    return prisma.reservation.findMany({
        where: {
            room_id : roomId
        }
    });
};

export const deleteReservation = async (reservationId: number): Promise<void> => {
    try {

        await prisma.reservation.delete({
            where:{
                reservation_id: reservationId
            }
        });
        
        }
        catch (error) {

            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundError(
                    "Reservation not found"
                );
            }
        
            throw error;
        }
};