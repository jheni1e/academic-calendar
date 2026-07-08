import { ISubjectRepository } from "../repositories/ISubjectRepository.ts";

export class FindSubjectByIdUseCase {
    constructor(
        private readonly subjectRepository: ISubjectRepository
    ) {}

    async execute(subjectId: number) {

        const subject = await this.subjectRepository.findById(subjectId);

        if (!subject) {
            throw new Error("Matéria não encontrada.");
        }

        return subject;
    }
}