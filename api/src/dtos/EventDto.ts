import { EventStatus, EventType } from "../generated/prisma/enums.ts";
export interface CreateEventDTO {

    title: string;
    description?: string;

    eventType: EventType;

    subjectInstructorId?: number;
    recurrenceId?: number;
    roomId?: number;

    startDate: Date;
    endDate: Date;

    createdBy: number;
}

export interface UpdateEventDTO {

    title?: string;
    description?: string;

    eventType?: EventType;

    subjectInstructorId: number; // Cannot be undefined
    recurrenceId?: number;

    startDate: Date; // Cannot be undefined
    endDate: Date; // Cannot be undefined

    roomId?: number;
}

export interface EventResponseDTO {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    status: EventStatus;
}