import { NotBeforeError } from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError.ts";
import { BadRequestError } from "../../../shared/errors/BadRequestError.ts";
import { IRoleRepository } from "../repositories/IRoleRepository.ts";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";

export class DeleteRoleUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute(roleId: number) {

        // Verifica se o papel existe
        const role = await this.roleRepository.findById(roleId);

        if (!role) {
            throw new NotFoundError("Role not found.");
        }

        await this.roleRepository.delete(roleId);
    }
}