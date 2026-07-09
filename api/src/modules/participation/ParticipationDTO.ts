export interface CreateParticipationDTO {
    participationId: number,
    userId: number,
    eventRoleId: number,
    eventId: number,
    isConfirmed: boolean
}

export interface UpdateParticipationDTO {
    participationId?: number,
    userId?: number,
    eventRoleId?: number,
    eventId?: number,
    isConfirmed?: boolean
}

export interface ParticipationResponseDTO {
    participationId: number,
    userId: number,
    eventRoleId: number,
    eventId: number,
    isConfirmed: boolean
}