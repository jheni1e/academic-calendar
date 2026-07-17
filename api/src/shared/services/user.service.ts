import { User } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import { CreateUserDTO, UpdateUserDTO } from "../../modules/user/UserDto.ts";

export const createUser =  async (
    data: CreateUserDTO
): Promise<User> => {

    return await prisma.user.create({
        data: {
            user_edv: data.edv,
            name: data.name,
            birthday: data.birthdate,
            is_active: true,
            password : data.password
        }
    });
}


export const findUserByEdv =  async (
    userEdv: number
): Promise<User | null> => {

    return await prisma.user.findUnique({
        where: {
            user_edv: userEdv
        }
    });
}

export const findUserByName = async (
    name: string
): Promise<User | null> => {

    return await prisma.user.findFirst({
        where: {
            name: name
        }
    });
}

export const findUserById = async (
    userId: number
): Promise<User | null> => {

    return await prisma.user.findUnique({
        where: {
            user_id: userId
        }
    });
}

export const findAllUsers = async (): Promise<User[]> => {

    return await prisma.user.findMany();
}

export const deleteUser = async (
    userId: number,
    data: UpdateUserDTO
): Promise<User> => {

    return await prisma.user.update({
        where: {
            user_id: userId
        },
        data: {
            name: data.name,
            birthday: data.birthdate
        }
    });
}

export const disableUser = async (
    id: number
): Promise<User> => {

    return await prisma.user.update({
        where: {
            user_id: id
        },
        data: {
            is_active: false
        }
    });
}