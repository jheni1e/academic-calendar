import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "../dtos/UserDTO.ts";
import { User, UserRole } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";

export const createUser = async (
    data: CreateUserDTO
): Promise<User> => {

    if (!Object.values(UserRole).includes(data.role as UserRole)) {
            throw new Error(`Role '${data.role}' not found`);
    }

    const user = await prisma.user.create({
        data: {
            user_edv: data.edv,
            name: data.name,
            birthday: data.birthdate,
            is_active: true,
            password : data.password,
            role: data.role as UserRole
        }
    })
    return user

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
): Promise<UserResponseDTO | null> => {

    const user = await prisma.user.findUnique({
        where: {
            user_id: userId
        }
    });

    if (!user) {
        return null;
    }

    return {
        edv: user.user_edv,
        id: user.user_id,
        name: user.name,
        isActive: user.is_active,
        role: user.role
    };
}

export const findAllUsers = async() : Promise<UserResponseDTO[] | null> => {

    const users = await prisma.user.findMany({});

    return users.map(({ password, ...user }) => ({
        edv: user.user_edv,
        name: user.name,
        isActive: user.is_active,
        id: user.user_id,
        role: user.role
    }));
}

export const updateUser = async (
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