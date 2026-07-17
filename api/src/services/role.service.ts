import { Role } from "../../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { CreateRoleDTO, UpdateRoleDTO } from "../dtos/RoleDTO.ts";

export const createRole = async (
    data: CreateRoleDTO
): Promise<Role> => {

    return prisma.role.create({
        data: {
            name: data.name
        }
    });
}

export const findRoleById = async (
    roleId: number
): Promise<Role | null> => {

    return prisma.role.findUnique({
        where: {
            role_id: roleId
        }
    });
}

export const findRoleByName = async (
    name: string
): Promise<Role | null> => {

    return prisma.role.findUnique({
        where: {
            name: name
        }
    });
}

export const findAllRoles = async (): Promise<Role[]> => {

    return prisma.role.findMany();
}

export const updateRole = async (
    roleId: number,
    data: UpdateRoleDTO
): Promise<Role> => {

    return prisma.role.update({
        where: {
            role_id: roleId
        },
        data: {
            name: data.name
        }
    });
}

export const deleteRole = async (
    roleId: number
): Promise<void> => {

    await prisma.role.delete({
        where: {
            role_id: roleId
        }
    });
}