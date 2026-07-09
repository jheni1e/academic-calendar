import { IEventRoleRepository } from "../repositories/IEventRoleRepository.ts";

export class GetEventRolesUseCase {
    constructor(
        private readonly eventRoleRepository: IEventRoleRepository
    ) {}

    async execute() {

        return await this.eventRoleRepository.findAll();
    }
}