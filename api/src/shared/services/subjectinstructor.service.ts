import { SubjectInstructor } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import { CreateSubjectInstructorDTO, UpdateSubjectInstructorDTO } from "../../modules/subjectInstructor/SubjectInstructorDto.ts";

export const createSubjectInstructor = async (data: CreateSubjectInstructorDTO): Promise<SubjectInstructor> => {
        
    return prisma.subjectInstructor.create({
        data: {
            subject_id: data.subjectId,
            instructor_id: data.instructorId,
        }
    });
}

export const findSubjectInstructorById = async (subjectInstructorId: number): Promise<SubjectInstructor | null> => {
    return prisma.subjectInstructor.findUnique({
        where: {
            subject_instructor_id: subjectInstructorId
        }
    })
}

export const findSubjectInstructorsBySubject = async (subjectId: number): Promise<SubjectInstructor[]> => {
    return prisma.subjectInstructor.findMany({
        where: {
            subject_id: subjectId
        }
    });
}

export const findSubjectInstructorsByInstructor = async (instructorId: number): Promise<SubjectInstructor[]> => {
    return prisma.subjectInstructor.findMany({
        where: {
            instructor_id: instructorId
        }
    })
}

export const findSubjectInstructorBySubjectAndInstructor = async (
    subjectId: number,
    instructorId: number
): Promise<SubjectInstructor | null> => {

    return prisma.subjectInstructor.findUnique({
        where: {
            subject_instructor_unique: {
                subject_id: subjectId,
                instructor_id: instructorId
            }
        }
    });
}

export const findAllSubjectInstructors = async (): Promise<SubjectInstructor[]> => {
    return prisma.subjectInstructor.findMany();
}

export const updateSubjectInstructor = async (
    subjectInstructorId: number,
    data: UpdateSubjectInstructorDTO
): Promise<SubjectInstructor> => {
    
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

export const deleteSubjectInstructor = async (subjectInstructorId: number): Promise<void> => {
    await prisma.subjectInstructor.delete({
        where: {
            subject_instructor_id: subjectInstructorId
        }
    });
}