export interface CreateEventDTO {
    title: string;
    description?: string;

    eventTypeId: number;

    subjectId?: number;
    classId?: number;

    createdBy: number;
}

export interface UpdateEventDTO {
    title?: string;
    description?: string;

    eventTypeId?: number;

    subjectId?: number;
    classId?: number;
}