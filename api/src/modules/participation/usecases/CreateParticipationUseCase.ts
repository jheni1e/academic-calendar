import { CreateParticipationDTO } from "../ParticipationDTO.ts";
import { IParticipationRepository } from "../repositories/IParticipationRepository.ts";

export class CreateParticipationUseCase {
    constructor(
        private readonly participationRepository: IParticipationRepository
    ) {}

    async execute(data: CreateParticipationDTO) {

        // TODO: Verificar se o usuário existe.

        // TODO: Verificar se o evento existe.

        // TODO: Verificar se o papel do evento existe.

        // Verifica se o usuário já participa do evento
        const participation = await this.participationRepository.findByUserAndEvent(
            data.userId,
            data.eventId
        );

        if (participation) {
            throw new Error("O usuário já está participando deste evento.");
        }

        return await this.participationRepository.create(data);
    }
}