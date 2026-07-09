import { IEventRoleRepository } from "../repositories/IEventRoleRepository.ts";
import { CreateEventRoleDTO } from "../EventRoleDTO.ts";

export class CreateEventRoleUseCase {
    constructor(
        private readonly eventRoleRepository: IEventRoleRepository
    ) {}

    async execute(data: CreateEventRoleDTO) {

        if (!data.name.trim()) {
            throw new Error("Nome do papel do evento é obrigatório.");
        }

        return await this.eventRoleRepository.create(data);
    }
}