export class CreateRecurrenceDTO {
    repeat_until?: Date;
    occurrences?: number;
    created_by!: number;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
}

export interface UpdateRecurrenceDTO {
    endDate?: Date;
    occurrences?: number;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
}
