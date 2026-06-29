import { prisma } from "../../../lib/prisma.ts";
import { CreateSubjectInstructorDTO, UpdateSubjectInstructorDTO } from "../SubjectInstructorDto.ts";
import { ISubjectInstructorRepository } from "./ISubjectInstructorRepository.ts";

export class PrismaSubjectInstructorRepository implements ISubjectInstructorRepository{

    async create(data: CreateSubjectInstructorDTO): Promise<SubjectInstructor> {
        
        return prisma.subjectInstructor.create({
            data: {
                subject_id: data.subjectId,
                instructor_id: data.instructorId,
            }
        });
    }

    async findById(subjectInstructorId: number): Promise<SubjectInstructor | null> {
        return prisma.subjectInstructor.findUnique({
            where: {
                subject_instructor_id: subjectInstructorId
            }
        })
    }

    async findAll(): Promise<SubjectInstructor[]> {
        return prisma.subjectInstructor.findMany();
    }

    async update(
        subjectInstructorId: number,
        data: UpdateSubjectInstructorDTO
    ): Promise<SubjectInstructor> {
        
        return prisma.subjectInstructor.update({
            where: {
                subject_instructor_id: subjectInstructorId
            },
            data: {
                subject_id: data.subjectId,
                instructor_id: data.instructorId
            }
        });
    }

    async delete(subjectInstructorId: number): Promise<void> {
        await prisma.subjectInstructor.delete({
            where: {
                subject_instructor_id: subjectInstructorId
            }
        });
    }
}