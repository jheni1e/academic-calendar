import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class DeleteAssignmentUseCase {

    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) { }

    async execute(
        assignmentId: number
    ) {
        const assignment = await this.assignmentRepository.findById(assignmentId);

        if (!assignment) {
            throw new NotFoundError("Assignment not found.");
        }

        await this.assignmentRepository.delete(assignmentId);
    }

}