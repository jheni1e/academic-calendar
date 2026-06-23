
import { prisma } from "../../../lib/prisma.ts";
import { CreateClassUserDto } from "../ClassUserDto.ts";

import { IClassUserRepository } from "./IClassUserRepository.ts";

export class PrismaClassUserRepository implements IClassUserRepository {

    async exists(
    classId: number,
    userId: number
    ): Promise<boolean> {
        const relation = await prisma.classUser.findFirst({
            where: {
                class_id: classId,
                user_id: userId
            }
    });

    return relation !== null;
}


    async create(
        data: CreateClassUserDto
    ): Promise<ClassUser> {

        return prisma.classUser.create({
            data: {
                class_id: data.classId,
                user_id: data.userId
            }
        });
    }

    async findById(
        classUserId: number
    ): Promise<ClassUser | null> {

        return prisma.classUser.findUnique({
            where: {
                class_user_id: classUserId
            }
        });
    }

    async findByUser(
        userId: number
    ): Promise<ClassUser[]> {

        return prisma.classUser.findMany({
            where: {
                user_id: userId
            }
        });
    }

    async findByClass(
        classId: number
    ): Promise<ClassUser[]> {

        return prisma.classUser.findMany({
            where: {
                class_id: classId
            }
        });
    }

    async findAll(): Promise<ClassUser[]> {

        return prisma.classUser.findMany();
    }

    async delete(
        classUserId: number
    ): Promise<void> {

        await prisma.classUser.delete({
            where: {
                class_user_id: classUserId
            }
        });
    }
}