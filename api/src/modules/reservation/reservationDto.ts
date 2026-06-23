export interface CreateReservationDTO {
    roomId: number
    eventId: number
    schedule_start: Date
    schedule_end: Date
    is_blocked: boolean
    is_confirmed?: boolean
    description?: string
}

export interface UpdateReservationDTO {
    reservationId?: number
    roomId?: number
    eventId?: number
    schedule_start?: Date
    schedule_end?: Date
    is_blocked?: boolean
    is_confirmed?: boolean
    description?: string
}