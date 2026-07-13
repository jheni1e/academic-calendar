import { BadRequestError } from "../../../shared/errors/BadRequestError.ts";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IRoleRepository } from "../repositories/IRoleRepository.ts";
import { UpdateRoleDTO } from "../RoleDTO.ts";

export class UpdateRoleUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute(
        roleId: number,
        data: UpdateRoleDTO
    ) {

        // Verifica se o papel existe
        const role = await this.roleRepository.findById(roleId);

        if (!role) {
            throw new NotFoundError("Role not found.");
        }

        // Caso o nome seja informado, ele não pode ser vazio
        if (data.name !== undefined && !data.name.trim()) {
            throw new BadRequestError("Nome do papel é obrigatório.");
        }

        return await this.roleRepository.update(
            roleId,
            data
        );
    }
}