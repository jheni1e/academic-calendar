import { ISubjectRepository } from "../repositories/ISubjectRepository.ts";

export class ActivateSubjectUseCase {
    constructor(
        private readonly subjectRepository: ISubjectRepository
    ) {}

    async execute(subjectId: number) {
        const subject = await this.subjectRepository.findById(subjectId);

        if (!subject) {
            throw new Error("Matéria não encontrada.");
        }

        if (subject.is_active) {
            throw new Error("Matéria já está ativa.");
        }

        return await this.subjectRepository.update(subjectId, {
            isActive: true
        });
    }
}