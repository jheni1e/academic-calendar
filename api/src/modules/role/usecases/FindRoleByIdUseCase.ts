import { IRoleRepository } from "../repositories/IRoleRepository.ts";

export class FindRoleByIdUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute(roleId: number) {

        const role = await this.roleRepository.findById(roleId);

        if (!role) {
            throw new Error("Papel não encontrado.");
        }

        return role;
    }
}