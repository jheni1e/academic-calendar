import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class DeleteAssignmentUseCase {
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(assignmentId: number) {

        const assignment =
            await this.assignmentRepository.findById(
                assignmentId
            );

        if (!assignment) {
            throw new Error("Vínculo não encontrado.");
        }

        // TODO: Need User Type Verification before delete!

        await this.assignmentRepository.delete(
            assignmentId
        );
    }
}