import { Participation } from "../../../generated/prisma/client.ts";

import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class GetParticipationsByEventUseCase {

    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(eventId: number): Promise<Participation[]> {

        return await this.participationRepository.findByEvent(eventId);

    }

}