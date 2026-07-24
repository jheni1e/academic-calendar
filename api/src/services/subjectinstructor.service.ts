import { prisma } from "../lib/prisma.ts";
import { CreateSubjectInstructorDTO, UpdateSubjectInstructorDTO } from "../dtos/SubjectInstructorDto.ts";
import { Subject, SubjectInstructor } from "../generated/prisma/client.ts";
import { UserResponseDTO } from "../dtos/UserDto.ts";

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

export const findSubjectInstructorsBySubject = async (subjectId: number): Promise<any[]> => {
    return prisma.subjectInstructor.findMany({
        where: {
            subject_id: subjectId
        },
        select: {
            subject: {
                select: {
                    name: true
                }
            },
            instructor: {
                select: {
                    name: true
                }
            }
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

export const findAllSubjectInstructors = async (): Promise<any[]> => {
    return prisma.subjectInstructor.findMany({
        select: {
            subject: {
                select: {
                    name: true
                }
            },
            instructor: {
                select: {
                    name: true
                }
            }
        }
    });
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

export const getInstructorsBySubject = async (
    subjectId: number
): Promise<UserResponseDTO[]> => {

    const subject = await prisma.subject.findUnique({
        where: {
            subject_id: subjectId
        },
        select: {
            responsables: {
                select: {
                    instructor: true
                }
            }
        }
    });

    if (!subject) {
        return [];
    }

    return subject.responsables.map(r => ({
        id: r.instructor.user_id,
        edv: r.instructor.user_edv,
        name: r.instructor.name,
        isActive: r.instructor.is_active,
        birthdate: r.instructor.birthday,
        role: r.instructor.role
    }));
}

export const getSubjectsByInstructor = async (instructorId: number) : Promise<Subject[]>=> {
    const user = await prisma.user.findUnique({
        where: {
            user_id: instructorId
        },
        select: {
            subjectAssignments: {
                select: {
                    subject: true
                }
            }
        }
    });

    if(!user)
        return []

    return user.subjectAssignments.map(sa => sa.subject)
}