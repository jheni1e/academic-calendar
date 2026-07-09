import { IEventTypeRepository } from "../repositories/IEventTypeRepository.ts";
import { UpdateEventTypeDTO } from "../EventTypeDTO.ts";

export class UpdateEventTypeUseCase {
    constructor(
        private readonly eventTypeRepository: IEventTypeRepository
    ) {}

    async execute(
        eventTypeId: number,
        data: UpdateEventTypeDTO
    ) {

        // Verifica se o tipo de evento existe
        const eventType =
            await this.eventTypeRepository.findById(eventTypeId);

        if (!eventType) {
            throw new Error("Tipo de evento não encontrado.");
        }

        // Caso o nome seja informado, ele não pode ser vazio
        if (data.name !== undefined && !data.name.trim()) {
            throw new Error("Nome do tipo de evento é obrigatório.");
        }

        return await this.eventTypeRepository.update(
            eventTypeId,
            data
        );
    }
}