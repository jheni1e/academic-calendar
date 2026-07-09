import { ISubjectInstructorRepository } from "../repositories/ISubjectInstructorRepository.ts";

export class DeleteSubjectInstructorUseCase {
    constructor(
        private readonly subjectInstructorRepository: ISubjectInstructorRepository
    ) {}

    async execute(subjectInstructorId: number) {

        const subjectInstructor =
            await this.subjectInstructorRepository.findById(subjectInstructorId);

        if (!subjectInstructor) {
            throw new Error("Vínculo entre matéria e instrutor não encontrado.");
        }

        await this.subjectInstructorRepository.delete(subjectInstructorId);
    }
}