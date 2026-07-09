import { ISubjectRepository } from "../repositories/ISubjectRepository.ts";

export class DeleteSubjectUseCase {
    constructor(
        private readonly subjectRepository: ISubjectRepository
    ) {}

    async execute(subjectId: number) {

        const subject = await this.subjectRepository.findById(subjectId);

        if (!subject) {
            throw new Error("Matéria não encontrada.");
        }

        if (subject.is_active) {
            throw new Error("Apenas matérias inativas podem ser deletadas.");
        }

        // TODO: Need User Type Verification before delete!
        // TODO: Verify if the subject has events before deleting.
        // TODO: Verify if the subject has instructors before deleting.
        // TODO: Verify if the subject has rooms before deleting.

        await this.subjectRepository.delete(subjectId);
    }
}