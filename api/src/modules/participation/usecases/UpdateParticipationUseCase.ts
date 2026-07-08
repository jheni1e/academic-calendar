import { UpdateParticipationDTO } from "../ParticipationDTO.ts";
import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class UpdateParticipationUseCase {
    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(
        participationId: number,
        data: UpdateParticipationDTO
    ) {

        const participation = await this.participationRepository.findById(participationId);

        if (!participation) {
            throw new Error("Participação não encontrada.");
        }

        return await this.participationRepository.update(
            participationId,
            data
        );
    }
}