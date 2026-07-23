export interface CreateRecurrenceDTO {
    seriesName?: string;
    createdBy?: number;
    repeatUntil?: Date;
    occurrences?: number;

    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
}

export interface UpdateRecurrenceDTO {
    recurrence_id: number;

    repeat_until?: Date;
    occurrences?: number;

    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
}