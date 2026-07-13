import { AppError } from "../../../shared/errors/AppError.ts";
import { BadRequestError } from "../../../shared/errors/BadRequestError.ts";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IRoleRepository } from "../repositories/IRoleRepository.ts";

export class FindRoleByIdUseCase {
    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    async execute(roleId: number) {

        const role = await this.roleRepository.findById(roleId);

        if (!role) {
            throw new NotFoundError("Role not found.");
        }

        return role;
    }
}