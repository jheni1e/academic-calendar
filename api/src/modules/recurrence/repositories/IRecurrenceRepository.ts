import { Recurrence } from "../../../generated/prisma/client.ts";
import { CreateRecurrenceDTO } from "../CreateRecurrenceDTO.ts";

export interface IRecurrenceRepository {
    create(
        data: CreateRecurrenceDTO
    ): Promise<Recurrence>;
}