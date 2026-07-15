import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class DeleteAssignmentUseCase {

    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(
        assignmentId: number
    ) {
        await this.assignmentRepository.delete(assignmentId);
    }

}