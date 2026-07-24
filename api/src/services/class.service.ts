import { prisma } from "../lib/prisma.ts";
import { CreateClassDTO, UpdateClassDTO } from "../dtos/ClassDto.ts";
import { Class } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { Event } from "../generated/prisma/client.ts";

export const createClass = async (
    data: CreateClassDTO
): Promise<Class> => {

    return prisma.class.create({
        data: {
            name: data.name,
            is_active: data.isActive ?? true
        }
    });
}

export const findClassById = async (
    classId: number
): Promise<Class | null> => {

    return await prisma.class.findUnique({
        where: {
            class_id: classId
        }
    });
}

export const findAllClasses = async (): Promise<Class[]> => {

    return prisma.class.findMany();
}

export const updateClass = async (
    classId: number,
    data: UpdateClassDTO
): Promise<Class> => {

    return await prisma.class.update({
        where: {
            class_id: classId
        },
        data: {
            name: data.name,
            is_active: data.isActive
        }
    });

}

export const deleteClass = async(
    classId: number
): Promise<void> => {

    await prisma.class.delete({
        where: {
            class_id: classId
        }
    });
}

export const getEventsByClass = async (
    classId: number
): Promise<Event[]> => {

    const classItem = await prisma.class.findUnique({
        where: {
            class_id: classId
        },
        include: {
            events: true
        }
    });

    return classItem?.events ?? [];
}