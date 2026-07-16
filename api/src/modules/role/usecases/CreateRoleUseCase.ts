import { BadRequestError } from "../../../shared/errors/BadRequestError.ts";
import { IRoleRepository } from "../repositories/IRoleRepository.ts";
import { CreateRoleDTO } from "../../../dtos/RoleDTO.ts";

export class CreateRoleUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute(data: CreateRoleDTO) {

        // Verifica se o nome foi informado
        if (!data.name.trim()) {
            throw new BadRequestError("Nome do papel é obrigatório.");
        }

        return await this.roleRepository.create(data);
    }
}