import { IRoleRepository } from "../repositories/IRoleRepository.ts";

export class DeleteRoleUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute(roleId: number) {

        // Verifica se o papel existe
        const role = await this.roleRepository.findById(roleId);

        if (!role) {
            throw new Error("Papel não encontrado.");
        }

        await this.roleRepository.delete(roleId);
    }
}