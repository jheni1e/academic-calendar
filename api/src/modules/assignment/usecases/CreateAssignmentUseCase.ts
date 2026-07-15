import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

import { CreateAssignmentDTO } from "../AssignmentDTO.ts";

export class CreateAssignmentUseCase {
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(data: CreateAssignmentDTO) {
        return await this.assignmentRepository.create(data);
    }
}