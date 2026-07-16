import { ReservationStatus } from "../generated/prisma/client.ts";

export interface CreateReservationDTO {
    roomId: number;
    eventId: number;
    scheduleStart: Date;
    scheduleEnd: Date;
    status: ReservationStatus;
    isBlocked?: boolean;
    description?: string;
}

export interface UpdateReservationDTO {
    reservationId?: number
    roomId?: number
    eventId?: number
    scheduleStart?: Date
    scheduleEnd?: Date
    status?: ReservationStatus;
    isBlocked?: boolean
    isConfirmed?: boolean
    description?: string
}