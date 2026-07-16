import { IEventRepository } from "../repositories/IEventRepository.ts";
import { CreateEventDTO } from "../../../dtos/EventDTO.ts";
import { IClassRepository } from "../../class/repositories/IClassRepository.ts";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { ISubjectRepository } from "../../subject/repositories/ISubjectRepository.ts";

export class CreateEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository,
        private readonly classRepository: IClassRepository,
        private readonly subjectRepository: ISubjectRepository,
    ) {}

    async execute(data: CreateEventDTO) {

        // Verifica se o título foi informado
        if (!data.title.trim()) {
            throw new Error("Event title is required.");
        }

        // Verifica se existe um tipo de evento
        if (!data.eventTypeId) {
            throw new Error("Event type is required.");
        }

        // Validar se a turma existe (caso classId seja informado)
        if (data.classId){
            const varClass = await this.classRepository.findById(data.classId);
            if (!varClass){
                throw new NotFoundError("Class not found.");
            }
        }

        // Validar se a matéria existe (caso subjectId seja informado)
        if (data.subjectId) {
            const subject = await this.subjectRepository.findById(data.subjectId);
        
            if (!subject) {
                throw new NotFoundError("Subject not found.");
            }
        }

        // TODO: Validar se o usuário criador existe
        return await this.eventRepository.create(data);
    }
}