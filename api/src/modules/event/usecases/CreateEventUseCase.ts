import { IEventRepository } from "../repositories/IEventRepository.ts";
import { CreateEventDTO } from "../EventDto.ts";

export class CreateEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository
    ) {}

    async execute(data: CreateEventDTO) {

        // Verifica se o título foi informado
        if (!data.title.trim()) {
            throw new Error("Título do evento é obrigatório.");
        }

        // Verifica se existe um tipo de evento
        if (!data.eventTypeId) {
            throw new Error("Tipo do evento é obrigatório.");
        }

        // TODO: Validar se a turma existe (caso classId seja informado)

        // TODO: Validar se a matéria existe (caso subjectId seja informado)

        // TODO: Validar se o usuário criador existe

        return await this.eventRepository.create(data);
    }
}