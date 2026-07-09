import { ISubjectInstructorRepository } from "../repositories/ISubjectInstructorRepository.ts";

export class GetSubjectInstructorsUseCase {
    constructor(
        private readonly subjectInstructorRepository: ISubjectInstructorRepository
    ) {}

    async execute() {

        return await this.subjectInstructorRepository.findAll();
    }
}