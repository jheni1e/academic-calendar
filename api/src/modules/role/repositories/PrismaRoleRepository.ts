import { Role } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";

import {
    CreateRoleDTO,
    UpdateRoleDTO
} from "../RoleDTO.ts";

import { IRoleRepository } from "./IRoleRepository.ts";

export class PrismaRoleRepository implements IRoleRepository {

    async create(
        data: CreateRoleDTO
    ): Promise<Role> {

        return prisma.role.create({
            data: {
                name: data.name
            }
        });
    }

    async findById(
        roleId: number
    ): Promise<Role | null> {

        return prisma.role.findUnique({
            where: {
                role_id: roleId
            }
        });
    }

    async findByName(
        name: string
    ): Promise<Role | null> {

        return prisma.role.findUnique({
            where: {
                name: name
            }
        });
    }
    
    async findAll(): Promise<Role[]> {

        return prisma.role.findMany();
    }

    async update(
        roleId: number,
        data: UpdateRoleDTO
    ): Promise<Role> {

        return prisma.role.update({
            where: {
                role_id: roleId
            },
            data: {
                name: data.name
            }
        });
    }

    async delete(
        roleId: number
    ): Promise<void> {

        await prisma.role.delete({
            where: {
                role_id: roleId
            }
        });
    }
}