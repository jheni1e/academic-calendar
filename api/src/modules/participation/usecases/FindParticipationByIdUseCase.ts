import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class FindParticipationByIdUseCase {
    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(participationId: number) {

        const participation = await this.participationRepository.findById(participationId);

        if (!participation) {
            throw new Error("Participação não encontrada.");
        }

        return participation;
    }
}