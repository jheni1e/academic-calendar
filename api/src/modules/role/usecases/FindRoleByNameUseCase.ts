import { IRoleRepository } from "../repositories/IRoleRepository.ts";

export class FindRoleByNameUseCase {

    constructor(
            private readonly roleRepository: IRoleRepository
        ) {}
    
    async execute(roleName: string) {
        const role = await this.roleRepository.findByName(roleName);

        if (!role) {
            throw new Error("Papel não encontrado.");
        }

        return role;
    }
}