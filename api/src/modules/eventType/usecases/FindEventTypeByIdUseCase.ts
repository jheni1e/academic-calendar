import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IEventTypeRepository } from "../repositories/IEventTypeRepository.ts";

export class FindEventTypeByIdUseCase {
    constructor(
        private readonly eventTypeRepository: IEventTypeRepository
    ) {}

    async execute(eventTypeId: number) {

        const eventType =
            await this.eventTypeRepository.findById(eventTypeId);

        if (!eventType) {
            throw new NotFoundError("Event type not found.");
        }

        return eventType;
    }
}