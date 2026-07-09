import { SubjectInstructor } from "../../../generated/prisma/client.ts";
import { CreateSubjectInstructorDTO, UpdateSubjectInstructorDTO } from "../SubjectInstructorDto.ts";
export interface ISubjectInstructorRepository {

    create(
        data: CreateSubjectInstructorDTO
    ): Promise<SubjectInstructor>;

    findById(
        subjectInstructorId: number
    ): Promise<SubjectInstructor | null>;

    findBySubject(
        subjectId: number
    ): Promise<SubjectInstructor[]>;
    
    findByInstructor(
        instructorId: number
    ): Promise<SubjectInstructor[]>;

    findBySubjectAndInstructor(
        subjectId: number,
        instructorId: number
    ) : Promise<SubjectInstructor | null>;

    findAll(): Promise<SubjectInstructor[]>;

    // update(
    //     subjectInstructorId: number,
    //     data: UpdateSubjectInstructorDTO
    // ): Promise<SubjectInstructor>;

    delete(
        subjectInstructorId: number
    ): Promise<void>;
}