import { ParticipationResponseDTO } from "../ParticipationDTO.ts";
import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class GetParticipationsByUserUseCase {

    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(
        userId: number
    ): Promise<ParticipationResponseDTO[]> {

        return await this.participationRepository.findByUser(userId);

    }

}