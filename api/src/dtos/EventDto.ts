import { CreateRecurrenceDTO } from "./RecurrenceDTO.ts";

export interface CreateEventDTO {
    title: string;
    description?: string;

    eventTypeId: number;

    subjectId?: number;
    classId?: number;
    recurrence?: CreateRecurrenceDTO;

    createdBy: number;
}

export interface UpdateEventDTO {
    title?: string;
    description?: string;

    eventTypeId?: number;

    subjectId?: number;
    classId?: number;
}