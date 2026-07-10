import { IEventTypeRepository } from "../repositories/IEventTypeRepository.ts";

export class DeleteEventTypeUseCase {
    constructor(
        private readonly eventTypeRepository: IEventTypeRepository
    ) {}

    async execute(eventTypeId: number) {

        // Verifica se o tipo de evento existe
        const eventType =
            await this.eventTypeRepository.findById(eventTypeId);

        if (!eventType) {
            throw new Error("Tipo de evento não encontrado.");
        }

        await this.eventTypeRepository.delete(eventTypeId);
    }
}