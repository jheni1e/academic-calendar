import { Subject } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { CreateSubjectDTO, UpdateSubjectDTO } from "../SubjectDto.ts";
import { ISubjectRepository } from "./ISubjectRepository.ts";

export class PrismaSubjectRepository implements ISubjectRepository {

    async create(
        data: CreateSubjectDTO
    ): Promise<Subject> {

        return prisma.subject.create({
            data: {
                class_id: data.classId,
                name: data.name,
                workload: data.workload,
                start_date: data.startDate,
                end_date: data.endDate
            }
        });
    }

    async findById(
        subjectId: number
    ): Promise<Subject | null> {

        return prisma.subject.findUnique({
            where: {
                subject_id: subjectId
            }
        });
    }

    async findAll(): Promise<Subject[]> {

        return prisma.subject.findMany();
    }

    async update(
        subjectId: number,
        data: UpdateSubjectDTO
    ): Promise<Subject> {

        return prisma.subject.update({
            where: {
                subject_id: subjectId
            },
            data: {
                class_id: data.classId,
                name: data.name,
                workload: data.workload,
                start_date: data.startDate,
                end_date: data.endDate
            }
        });
    }

    async delete(
        subjectId: number
    ): Promise<void> {

        await prisma.subject.delete({
            where: {
                subject_id: subjectId
            }
        });
    }
}