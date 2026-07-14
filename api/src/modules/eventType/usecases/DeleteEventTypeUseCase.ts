import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
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
            throw new NotFoundError("Event type not found.");
        }

        await this.eventTypeRepository.delete(eventTypeId);
    }
}