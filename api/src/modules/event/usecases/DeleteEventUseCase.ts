import { IEventRepository } from "../repositories/IEventRepository.ts";

export class DeleteEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository
    ) {}

    async execute(eventId: number) {

        const event = await this.eventRepository.findById(eventId);

        if (!event) {
            throw new Error("Evento não encontrado.");
        }

        // TODO: Não permitir excluir eventos com reservas confirmadas

        await this.eventRepository.delete(eventId);
    }
}