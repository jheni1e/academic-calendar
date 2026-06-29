export interface CreateParticipationDTO {
    participation_id: number,
    user_id: number,
    event_role_id: number,
    event_id: number,
    is_confirmed: boolean
}

export interface UpdateParticipationDTO {
    participation_id?: number,
    user_id?: number,
    event_role_id?: number,
    event_id?: number,
    is_confirmed?: boolean
}

export interface ParticipationResponseDTO {
    participation_id: number,
    user_id: number,
    event_role_id: number,
    event_id: number,
    is_confirmed: boolean
}