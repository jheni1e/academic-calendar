import { CreateReservationDTO, UpdateReservationDTO } from "../dtos/reservationDto.ts";
import { Reservation } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";

export const createReservation = async (
    data : CreateReservationDTO
): Promise<Reservation> => {

    return prisma.reservation.create({
        data: {
            room_id: data.roomId,
            event_id: data.eventId,
            status: data.status, description: data.description
        }
    });
}

export const updateReservation = async (
    reservationId: number,
    data: UpdateReservationDTO): Promise<Reservation> => {
        
    return prisma.reservation.update({
        where: {
            reservation_id : reservationId
        },

        data: {
            room_id: data.roomId,
            event_id: data.eventId,
            status: data.status,
            description: data.description
        }
    })
}

export const findAllReservations = async (): Promise<Reservation[]> => {
    return prisma.reservation.findMany();
}

export const findReservationById = async (reservationId: number): Promise<Reservation | null> => {
    return prisma.reservation.findUnique({
        where: {
            reservation_id : reservationId
        }
    })
}

export const findReservationByEvent = async (
    eventId: number
): Promise<Reservation | null> => {

    return prisma.reservation.findUnique({
        where: {
            event_id: eventId
        }
    });

}

export const findReservationsByRoom = async (roomId : number) : Promise<Reservation[] | null> => {
    return prisma.reservation.findMany({
        where: {
            room_id : roomId
        }
    })
}

export const deleteReservation = async (reservationId: number): Promise<void> => {
    await prisma.reservation.delete({
        where: {
            reservation_id : reservationId
        }
    })
}