import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "../dtos/UserDto.ts";
import { Subject, User, UserRole } from "../generated/prisma/client.ts";
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
): Promise<UserResponseDTO | null> => {

    const user = await prisma.user.findUnique({
        where: {
            user_edv: userEdv
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
        role: user.role,
        birthdate : user.birthday
    };
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
        role: user.role,
        birthdate : user.birthday
    };
}

export const findAllUsers = async() : Promise<UserResponseDTO[] | null> => {

    const users = await prisma.user.findMany({});

    return users.map(({ password, ...user }) => ({
        edv: user.user_edv,
        name: user.name,
        isActive: user.is_active,
        id: user.user_id,
        role: user.role,
        birthdate: user.birthday
    }));
}

export const updateUser = async (
    userId: number,
    data: UpdateUserDTO
): Promise<UserResponseDTO> => {

    const user = await prisma.user.update({
        where: {
            user_id: userId
        },
        data: {
            name: data.name,
            birthday: data.birthdate,
            role: data.role as UserRole
        }
    });

    return {
        edv : user.user_edv,
        id : user.user_id,
        name: user.name,
        role : user.role,
        isActive: user.is_active,
        birthdate : user.birthday
    }

}

export const disableUser = async (
    id: number
): Promise<UserResponseDTO> => {

    const user = await prisma.user.update({
        where: {
            user_id: id
        },
        data: {
            is_active: false
        }
    });

    return {
        edv: user.user_edv,
        id: user.user_id,
        name: user.name,
        birthdate: user.birthday,
        role: user.role,
        isActive: user.is_active
    }
}

export const activateUser = async (
    id : number
) : Promise<UserResponseDTO> => {

    const user = await prisma.user.update({
        where: {
            user_id: id
        }, 

        data: {
            is_active : true
        }
    })

    return {
        edv: user.user_edv,
        id: user.user_id,
        name: user.name,
        birthdate: user.birthday,
        role: user.role,
        isActive: user.is_active
    }
}

export const getInstructors = async () : Promise<UserResponseDTO[]> => {
    const users =  await prisma.user.findMany({
        where: {
            role: {
                in: ["ADMIN", "INSTRUCTOR"]
            }
        }
    })

    return users.map(({ password, ...user }) => ({
        edv: user.user_edv,
        name: user.name,
        isActive: user.is_active,
        id: user.user_id,
        role: user.role,
        birthdate: user.birthday
    }));
}

export const getSubjectsByInstructor = async (instructorId: number) : Promise<Subject[]>=> {
    const user = await prisma.user.findUnique({
        where: {
            user_id: instructorId
        },
        select: {
            subjectAssignments: {
                select: {
                    subject: true
                }
            }
        }
    });

    if(!user)
        return []

    return user.subjectAssignments.map(sa => sa.subject)
}