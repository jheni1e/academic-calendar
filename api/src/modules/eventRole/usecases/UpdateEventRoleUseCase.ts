import { IEventRoleRepository } from "../repositories/IEventRoleRepository.ts";
import { UpdateEventRoleDTO } from "../../../dtos/EventRoleDTO.ts";

export class UpdateEventRoleUseCase {
    constructor(
        private readonly eventRoleRepository: IEventRoleRepository
    ) {}

    async execute(
        eventRoleId: number,
        data: UpdateEventRoleDTO
    ) {

        const eventRole =
            await this.eventRoleRepository.findById(eventRoleId);

        if (!eventRole) {
            throw new Error("Papel do evento não encontrado.");
        }

        if (data.name !== undefined && !data.name.trim()) {
            throw new Error("Nome do papel do evento é obrigatório.");
        }

        return await this.eventRoleRepository.update(
            eventRoleId,
            data
        );
    }
}