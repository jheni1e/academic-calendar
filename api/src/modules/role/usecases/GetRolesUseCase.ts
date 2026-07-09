import { IRoleRepository } from "../repositories/IRoleRepository.ts";

export class GetRolesUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute() {

        return await this.roleRepository.findAll();
    }
}