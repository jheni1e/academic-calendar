import { ReservationStatus } from "../generated/prisma/client.ts";

export interface CreateReservationDTO {
    roomId: number;
    eventId: number;

    startDate: Date;
    endDate: Date;

    description?: string;
}

export interface UpdateReservationDTO {
    roomId?: number;
    eventId?: number;

    startDate?: Date;
    endDate?: Date;

    status?: ReservationStatus;

    isBlocked?: boolean;
    isConfirmed?: boolean;

    description?: string;
}

export interface UpdateReservationByEventDTO {
    roomId: number;

    startDate: Date;
    endDate: Date;

    description?: string;
}