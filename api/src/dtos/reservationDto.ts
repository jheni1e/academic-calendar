import { ReservationStatus } from "../generated/prisma/client.ts";

export interface CreateReservationDTO {
    roomId: number;
    eventId: number;

    startDate: Date;
    endDate: Date;

    description?: string;
}

export interface UpdateReservationDTO {
    reservationId: number;
    roomId?: number;
    description?: string;
}