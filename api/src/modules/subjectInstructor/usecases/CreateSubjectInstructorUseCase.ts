import { ISubjectInstructorRepository } from "../repositories/ISubjectInstructorRepository.ts";
import { CreateSubjectInstructorDTO } from "../SubjectInstructorDto.ts";

export class CreateSubjectInstructorUseCase {
    constructor(
        private readonly subjectInstructorRepository: ISubjectInstructorRepository
    ) {}

    async execute(data: CreateSubjectInstructorDTO) {

        // TODO: Verificar se a matéria existe.

        // TODO: Verificar se o usuário existe.

        const relation = await this.subjectInstructorRepository.findBySubjectAndInstructor(
            data.subjectId,
            data.instructorId
        );

        if (relation) {
            throw new Error("Instrutor já vinculado à matéria.");
        }

        return await this.subjectInstructorRepository.create(data);
    }
}