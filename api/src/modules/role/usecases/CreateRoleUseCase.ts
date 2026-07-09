import { IRoleRepository } from "../repositories/IRoleRepository.ts";
import { CreateRoleDTO } from "../RoleDTO.ts";

export class CreateRoleUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute(data: CreateRoleDTO) {

        // Verifica se o nome foi informado
        if (!data.name.trim()) {
            throw new Error("Nome do papel é obrigatório.");
        }

        return await this.roleRepository.create(data);
    }
}