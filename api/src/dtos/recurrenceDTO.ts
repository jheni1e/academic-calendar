import { RecurrenceFrequency } from "../generated/prisma/enums.ts";

export class CreateRecurrenceDTO {
    frequency: RecurrenceFrequency;
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
    frequency?: RecurrenceFrequency;
    endDate?: Date;
    occurrences?: number;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
}
