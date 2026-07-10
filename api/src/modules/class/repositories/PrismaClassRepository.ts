import { Class } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { CreateClassDTO, UpdateClassDTO } from "../ClassDTO.ts";
import { IClassRepository } from "./IClassRepository.ts";

export class PrismaClassRepository
    implements IClassRepository {

    async create(
        data: CreateClassDTO
    ): Promise<Class> {

        return prisma.class.create({
            data: {
                name: data.name,
                is_active: data.isActive ?? true
            }
        });
    }

    async findById(
        classId: number
    ): Promise<Class | null> {

        return prisma.class.findUnique({
            where: {
                class_id: classId
            }
        });
    }

    async findAll(): Promise<Class[]> {

        return prisma.class.findMany();
    }

    async update(
        classId: number,
        data: UpdateClassDTO
    ): Promise<Class> {

        return prisma.class.update({
            where: {
                class_id: classId
            },
            data: {
                name: data.name,
                is_active: data.isActive
            }
        });
    }

    async delete(
        classId: number
    ): Promise<void> {

        await prisma.class.delete({
            where: {
                class_id: classId
            }
        });
    }
}