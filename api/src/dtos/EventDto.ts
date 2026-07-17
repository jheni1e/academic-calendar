import { CreateRecurrenceDTO } from "./recurrenceDTO.ts";

export interface CreateEventDTO {
    title: string;
    description?: string;

    eventTypeId: number;

    subjectId?: number;
    classId?: number;
    recurrence?: CreateRecurrenceDTO;
    startDate: Date;
    endDate: Date;

    createdBy: number;
}

export interface UpdateEventDTO {
    title?: string;
    description?: string;

    eventTypeId?: number;

    subjectId?: number;
    classId?: number;
}