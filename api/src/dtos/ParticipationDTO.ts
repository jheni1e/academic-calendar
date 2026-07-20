import { ParticipationStatus } from "../generated/prisma/client.ts";

export interface CreateParticipationDTO {
    userId: number;
    eventRoleId: number;
    eventId: number;
    status: ParticipationStatus;
}

export interface UpdateParticipationDTO {
    eventId?: number;
    status?: ParticipationStatus;
}

// export interface ParticipationResponseDTO {
//     participationId?: number,
//     userId?: number,
//     eventRoleId?: number,
//     eventId?: number,
//     isConfirmed?: boolean
// }