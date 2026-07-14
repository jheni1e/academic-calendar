import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class FindParticipationByIdUseCase {
    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(participationId: number) {

        const participation = await this.participationRepository.findById(participationId);

        if (!participation) {
            throw new NotFoundError("Participation not found.");
        }

        return participation;
    }
}