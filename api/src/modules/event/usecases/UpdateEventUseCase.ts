import { IEventRepository } from "../repositories/IEventRepository.ts";
import { UpdateEventDTO } from "../EventDto.ts";

export class UpdateEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository
    ) {}

    async execute(eventId: number, data: UpdateEventDTO) {

        const event = await this.eventRepository.findById(eventId);

        if (!event) {
            throw new Error("Evento não encontrado.");
        }

        if (data.title !== undefined && !data.title.trim()) {
            throw new Error("Título do evento é obrigatório.");
        }

        // TODO: Impedir edição caso exista reserva bloqueada

        return await this.eventRepository.update(eventId, data);
    }
}