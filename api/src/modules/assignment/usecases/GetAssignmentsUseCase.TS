import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class GetAssignmentsUseCase {
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute() {

        return await this.assignmentRepository.findAll();
    }
}