import { prisma } from "../../../lib/prisma.ts";
import { CreateSubjectInstructorDTO, UpdateSubjectInstructorDTO } from "../../../dtos/SubjectInstructorDTO.ts";
import { ISubjectInstructorRepository } from "./ISubjectInstructorRepository.ts";
import { SubjectInstructor } from "../../../generated/prisma/client.ts";

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

    async findBySubject(subjectId: number): Promise<SubjectInstructor[]> {
        return prisma.subjectInstructor.findMany({
            where: {
                subject_id: subjectId
            }
        });
    }

    async findByInstructor(instructorId: number): Promise<SubjectInstructor[]> {
        return prisma.subjectInstructor.findMany({
            where: {
                instructor_id: instructorId
            }
        })
    }
    
    async findBySubjectAndInstructor(
        subjectId: number,
        instructorId: number
    ): Promise<SubjectInstructor | null> {
    
        return prisma.subjectInstructor.findUnique({
            where: {
                subject_instructor_unique: {
                    subject_id: subjectId,
                    instructor_id: instructorId
                }
            }
        });
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