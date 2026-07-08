import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class DeleteParticipationUseCase {
    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(participationId: number) {

        const participation = await this.participationRepository.findById(participationId);

        if (!participation) {
            throw new Error("Participação não encontrada.");
        }

        await this.participationRepository.delete(participationId);
    }
}