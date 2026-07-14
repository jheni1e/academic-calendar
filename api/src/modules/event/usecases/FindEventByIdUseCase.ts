import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IEventRepository } from "../repositories/IEventRepository.ts";

export class FindEventByIdUseCase {
    constructor(
        private readonly eventRepository: IEventRepository
    ) {}

    async execute(eventId: number) {

        const event = await this.eventRepository.findById(eventId);

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        return event;
    }
}