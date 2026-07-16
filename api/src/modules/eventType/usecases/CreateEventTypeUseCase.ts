import { IEventTypeRepository } from "../repositories/IEventTypeRepository.ts";
import { CreateEventTypeDTO } from "../../../dtos/EventTypeDTO.ts";

export class CreateEventTypeUseCase {
    constructor(
        private readonly eventTypeRepository: IEventTypeRepository
    ) {}

    async execute(data: CreateEventTypeDTO) {

        // Verifica se o nome foi informado
        if (!data.name.trim()) {
            throw new Error("Nome do tipo de evento é obrigatório.");
        }

        return await this.eventTypeRepository.create(data);
    }
}