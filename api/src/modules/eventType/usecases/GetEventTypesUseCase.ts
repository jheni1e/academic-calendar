import { IEventTypeRepository } from "../repositories/IEventTypeRepository.ts";

export class GetEventTypesUseCase {
    constructor(
        private readonly eventTypeRepository: IEventTypeRepository
    ) {}

    async execute() {

        return await this.eventTypeRepository.findAll();
    }
}