import { ISubjectInstructorRepository } from "../repositories/ISubjectInstructorRepository.ts";

export class GetSubjectsByInstructorUseCase {
    constructor(
        private readonly subjectInstructorRepository: ISubjectInstructorRepository
    ) {}

    async execute(instructorId: number) {

        const subjects =
            await this.subjectInstructorRepository.findByInstructor(instructorId);

        if (subjects.length === 0) {
            throw new Error("O instrutor não possui matérias vinculadas.");
        }

        return subjects;
    }
}