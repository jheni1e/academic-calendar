import { ISubjectRepository } from "../repositories/ISubjectRepository.ts";

export class DeactivateSubjectUseCase {
    constructor(
        private readonly subjectRepository: ISubjectRepository
    ) {}

    async execute(subjectId: number) {

        const subject = await this.subjectRepository.findById(subjectId);

        if (!subject) {
            throw new Error("Matéria não encontrada.");
        }

        if (!subject.is_active) {
            throw new Error("A matéria já está inativa.");
        }

        return await this.subjectRepository.update(subjectId, {
            isActive: false
        });
    }
}