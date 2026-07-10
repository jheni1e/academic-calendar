import { Role } from "../../../generated/prisma/client.ts";
import {
    CreateRoleDTO,
    UpdateRoleDTO
} from "../RoleDTO.ts";

export interface IRoleRepository {

    create(
        data: CreateRoleDTO
    ): Promise<Role>;

    findById(
        roleId: number
    ): Promise<Role | null>;

    findByName(
        name: string
    ): Promise<Role | null>;


    findAll(): Promise<Role[]>;

    update(
        roleId: number,
        data: UpdateRoleDTO
    ): Promise<Role>;

    delete(
        roleId: number
    ): Promise<void>;
}