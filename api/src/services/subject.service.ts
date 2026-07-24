import { Subject } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { CreateSubjectDTO, UpdateSubjectDTO } from "../dtos/SubjectDto.ts";
import { UserResponseDTO } from "../dtos/UserDto.ts";

export const createSubject = async (
    data: CreateSubjectDTO
): Promise<Subject> => {

    return prisma.subject.create({
        data: {
            class_id: data.classId,
            name: data.name,
            workload: data.workload,
            completed_workload: 0,
            start_date: data.startDate
        }
    });
}

export const findSubjectById = async (
    subjectId: number
): Promise<Subject | null> => {

    return prisma.subject.findUnique({
        where: {
            subject_id: subjectId
        }
    });
}

export const findAllSubjects = async (): Promise<Subject[]> => {

    return prisma.subject.findMany();
}

export const updateSubject = async (
    subjectId: number,
    data: UpdateSubjectDTO
): Promise<Subject> => {

    return prisma.subject.update({
        where: {
            subject_id: subjectId
        },
        data: {
            class_id: data.classId,
            name: data.name,
            workload: data.workload,
            start_date: data.startDate
        }
    });
}

export const findOnGoingSubjectsByInstructor = async (
    instructorId: number
) => {
    const subjects = await prisma.subject.findMany({
        where: {
            responsables: {
                some: {
                    instructor_id: instructorId
                }
            }
        }
    });

    return subjects.filter(
        s => s.completed_workload < s.workload
    );
};


export const findOnGoingSubjectsByClass = async (
    classId: number
) => {
    return prisma.$queryRaw`
        SELECT *
        FROM Subject
        WHERE class_id = ${classId}
        AND completed_workload < workload
        AND is_active = true
    `;
};

export const deleteSubject = async (
    subjectId: number
): Promise<void> => {

    await prisma.subject.delete({
        where: {
            subject_id: subjectId
        }
    });
}

