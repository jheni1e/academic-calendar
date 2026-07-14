import { RecurrenceFrequency } from "../../generated/prisma/enums.ts";

export interface CreateRecurrenceDTO {
    frequency: RecurrenceFrequency;

    endDate?: Date;
    occurrences?: number;

    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
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
    saturday?: boolean;
    sunday?: boolean;
}