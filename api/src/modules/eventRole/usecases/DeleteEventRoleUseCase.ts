import { IEventRoleRepository } from "../repositories/IEventRoleRepository.ts";

export class DeleteEventRoleUseCase {
    constructor(
        private readonly eventRoleRepository: IEventRoleRepository
    ) {}

    async execute(eventRoleId: number) {

        const eventRole =
            await this.eventRoleRepository.findById(eventRoleId);

        if (!eventRole) {
            throw new Error("Papel do evento não encontrado.");
        }

        await this.eventRoleRepository.delete(eventRoleId);
    }
}