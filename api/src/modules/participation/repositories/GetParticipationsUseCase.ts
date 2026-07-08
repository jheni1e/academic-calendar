import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class GetParticipationsUseCase {
    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute() {

        return await this.participationRepository.findAll();
    }
}