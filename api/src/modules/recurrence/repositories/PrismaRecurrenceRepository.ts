<<<<<<< HEAD
import { Recurrence } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { IRecurrenceRepository } from "../repositories/IRecurrenceRepository.ts"
import { CreateRecurrenceDTO } from "../CreateRecurrenceDTO.ts"

export class PrismaRecurrenceRepository implements IRecurrenceRepository {
    
    create(data: CreateRecurrenceDTO): Promise<Recurrence> {
        throw new Error("Method not implemented.");
    }
}
=======
//
>>>>>>> 2f3e67a6d57a8801d10f56e48b699a552345a6eb
