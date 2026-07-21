import { prisma } from "../lib/prisma.ts";
import { ClassUserResponseDTO, CreateClassUserDTO } from "../dtos/ClassUserDto.ts";
import { ClassUser } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";

export const createClassUser = async(
    data: CreateClassUserDTO
): Promise<ClassUser> => {

    return await prisma.classUser.create({
        data: {
            class_id: data.classId,
            user_id: data.userId
        }
    });
}

export const findClassUserById = async (
    classUserId: number
): Promise<ClassUser | null> => {

    const classUser = await prisma.classUser.findUnique({
        where: {
            class_user_id: classUserId
        },
        include: {
            class: true
        }
    });

    if(!classUser)
        throw new NotFoundError("Class not found")

    return classUser
}

export const findClassUsersByUser = async (
    userId: number
): Promise<ClassUserResponseDTO[]> => {

    const classNames =  await prisma.classUser.findMany({
        where: {
            user_id: userId
        },
        include: {
            class: true
        }
    });

    return classNames.map(c => ({
        className: c.class.name
    }));
}


export const findClassUsersByClass =  async (
    classId: number
): Promise<ClassUser[]> => {

    return await prisma.classUser.findMany({
        where: {
            class_id: classId
        },
        include: {
            user: true
        }
    });
}

export const findClassUsersByClassAndUser = async (
    classId: number,
    userId: number
): Promise<ClassUser | null> => {

    return await prisma.classUser.findUnique({
        where: {
            class_user_unique: {
                class_id: classId,
                user_id: userId
            }
        }
    });
}

export const findAllClassUser= async (): Promise<ClassUser[]>  => {

    return await prisma.classUser.findMany();
}

export const deleteClassUser =  async(
    classUserId: number
): Promise<void> => {

    await prisma.classUser.delete({
        where: {
            class_user_id: classUserId
        }
    });
}