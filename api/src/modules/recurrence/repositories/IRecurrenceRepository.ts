<<<<<<< HEAD
import { Recurrence } from "../../../generated/prisma/client.ts";
import { CreateRecurrenceDTO } from "../CreateRecurrenceDTO.ts";

export interface IRecurrenceRepository {
    create(
        data: CreateRecurrenceDTO
    ): Promise<Recurrence>;
}
=======
//
>>>>>>> 2f3e67a6d57a8801d10f56e48b699a552345a6eb
