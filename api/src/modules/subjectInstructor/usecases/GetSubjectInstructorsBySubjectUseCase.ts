import { ISubjectInstructorRepository } from "../repositories/ISubjectInstructorRepository.ts";

export class GetSubjectInstructorsBySubjectUseCase {
    constructor(
        private readonly subjectInstructorRepository: ISubjectInstructorRepository
    ) {}

    async execute(subjectId: number) {

        const subjectInstructors =
            await this.subjectInstructorRepository.findBySubject(subjectId);

        if (subjectInstructors.length === 0) {
            throw new Error("Nenhum instrutor encontrado para esta matéria.");
        }

        return subjectInstructors;
    }
}