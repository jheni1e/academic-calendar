import { RecurrenceFrequency } from "../../../generated/prisma/client.ts";

export class CreateRecurrenceDTO {
    series_name!: string;
    frequency: RecurrenceFrequency;
    repeat_until?: Date;
    occurrences?: number;
    created_by!: number;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
}
