import { IEventRepository } from "../repositories/IEventRepository.ts";

export class GetEventsUseCase {
    constructor(
        private readonly eventRepository: IEventRepository
    ) {}

    async execute() {

        return await this.eventRepository.findAll();
    }
}