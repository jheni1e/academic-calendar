import { prisma } from "../../../lib/prisma.ts";
import { ClassUser } from "../../../generated/prisma/client.ts";
import { CreateClassUserDTO } from "../../../dtos/ClassUserDTO.ts";
import { IClassUserRepository } from "./IClassUserRepository.ts";

export class PrismaClassUserRepository implements IClassUserRepository {

    async create(
        data: CreateClassUserDTO
    ): Promise<ClassUser> {

        return await prisma.classUser.create({
            data: {
                class_id: data.classId,
                user_id: data.userId
            }
        });
    }

    async findById(
        classUserId: number
    ): Promise<ClassUser | null> {

        return await prisma.classUser.findUnique({
            where: {
                class_user_id: classUserId
            }
        });
    }

    async findByUser(
        userId: number
    ): Promise<ClassUser[]> {

        return await prisma.classUser.findMany({
            where: {
                user_id: userId
            }
        });
    }

    async findByClass(
        classId: number
    ): Promise<ClassUser[]> {

        return await prisma.classUser.findMany({
            where: {
                class_id: classId
            }
        });
    }

    async findByClassAndUser(
        classId: number,
        userId: number
    ): Promise<ClassUser | null> {

        return await prisma.classUser.findUnique({
            where: {
                class_user_unique: {
                    class_id: classId,
                    user_id: userId
                }
            }
        });
    }

    async findAll(): Promise<ClassUser[]> {

        return await prisma.classUser.findMany();
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