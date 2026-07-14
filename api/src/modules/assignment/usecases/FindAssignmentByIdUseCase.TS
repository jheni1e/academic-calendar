import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class FindAssignmentByIdUseCase {
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(assignmentId: number) {

        const assignment =
            await this.assignmentRepository.findById(
                assignmentId
            );

        if (!assignment) {
            throw new Error("Assignment not found.");
        }

        return assignment;
    }
}