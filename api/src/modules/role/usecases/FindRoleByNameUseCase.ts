import { BadRequestError } from "../../../shared/errors/BadRequestError.ts";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IRoleRepository } from "../repositories/IRoleRepository.ts";

export class FindRoleByNameUseCase {

    constructor(
            private readonly roleRepository: IRoleRepository
        ) {}
    
    async execute(roleName: string) {
        const role = await this.roleRepository.findByName(roleName);

        if (!role) {
            throw new NotFoundError("Role not found.");
        }

        return role;
    }
}