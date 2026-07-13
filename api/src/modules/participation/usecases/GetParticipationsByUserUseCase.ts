import { Participation } from "../../../generated/prisma/client.ts";
import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class GetParticipationsByUserUseCase {

    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(
        userId: number
    ): Promise<Participation[]> {

        return await this.participationRepository.findByUser(userId);

    }

}