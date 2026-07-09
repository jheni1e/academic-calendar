import { IEventRoleRepository } from "../repositories/IEventRoleRepository.ts";

export class FindEventRoleByIdUseCase {
    constructor(
        private readonly eventRoleRepository: IEventRoleRepository
    ) {}

    async execute(eventRoleId: number) {

        const eventRole =
            await this.eventRoleRepository.findById(eventRoleId);

        if (!eventRole) {
            throw new Error("Papel do evento não encontrado.");
        }

        return eventRole;
    }
}