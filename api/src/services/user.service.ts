import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "../dtos/UserDto.ts";
import { User } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";

export const createUser = async (
    data: CreateUserDTO
): Promise<User> => {

    const user = await prisma.user.create({
        data: {
            user_edv: data.edv,
            name: data.name,
            birthday: data.birthdate,
            is_active: true,
            password : data.password
        }
    })

    for (const roleName of data.role) {
        const role = await prisma.role.findUnique({
            where: {
                name: roleName
            }
        });

        if (!role) {
            throw new Error(`Role '${roleName}' not found`);
        }

        await prisma.assignment.create({
            data: {
                user_id: user.user_id,
                role_id: role.role_id
            }
        });
    }
    
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
        },
        include: {
            assignments: {
                include: {
                    role: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });

    if (!user) {
        return null;
    }

    return {
        edv: user.user_edv,
        name: user.name,
        isActive: user.is_active,
        roles: user.assignments.map(a => a.role.name)
    };
}

export const findAllUsers = async() : Promise<UserResponseDTO[] | null> => {

    const users = await prisma.user.findMany({
        include: {
            assignments: {
                include: {
                    role: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        
        }
    });

    return users.map(({ password, assignments, ...user }) => ({
        edv: user.user_edv,
        name: user.name,
        isActive: user.is_active,
        roles: assignments.map(a => a.role.name)
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