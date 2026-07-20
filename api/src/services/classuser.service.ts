import { ClassUser } from "../../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { CreateClassUserDTO } from "../dtos/ClassUserDTO.ts";

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

    return await prisma.classUser.findUnique({
        where: {
            class_user_id: classUserId
        }
    });
}

export const findClassUsersByUser = async (
    userId: number
): Promise<ClassUser[]> => {

    return await prisma.classUser.findMany({
        where: {
            user_id: userId
        }
    });
}

export const findClassUsersByClass =  async (
    classId: number
): Promise<ClassUser[]> => {

    return await prisma.classUser.findMany({
        where: {
            class_id: classId
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