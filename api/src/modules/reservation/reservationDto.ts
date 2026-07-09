export interface CreateReservationDTO {
    roomId: number
    eventId: number
    scheduleStart: Date
    scheduleEnd: Date
    isBocked: boolean
    isConfirmed?: boolean
    description?: string
}

export interface UpdateReservationDTO {
    reservationId?: number
    roomId?: number
    eventId?: number
    scheduleStart?: Date
    scheduleEnd?: Date
    isBlocked?: boolean
    isConfirmed?: boolean
    description?: string
}