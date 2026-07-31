import { ParticipationStatus } from "../generated/prisma/client.ts";

export interface CreateParticipationDTO {
    userId: number;
    eventId: number;
} 

export interface UpdateParticipationDTO {
    eventId?: number;
    status?: ParticipationStatus;
}

export interface ParticipationResponseDTO {
    participationId: number,
    status: string,
    eventId: number
    eventName: string
    userId: number
    userName: string
}