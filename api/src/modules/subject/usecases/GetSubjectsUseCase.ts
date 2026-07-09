import { ISubjectRepository } from "../repositories/ISubjectRepository.ts";

export class GetSubjectsUseCase {
    constructor(
        private readonly subjectRepository: ISubjectRepository
    ) {}

    async execute() {
        return await this.subjectRepository.findAll();
    }
}