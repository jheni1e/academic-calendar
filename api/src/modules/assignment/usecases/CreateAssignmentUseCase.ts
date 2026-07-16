import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

import { CreateAssignmentDTO } from "../AssignmentDTO.ts";
import { ConflictError } from "../../../shared/errors/ConflictError.ts";

export class CreateAssignmentUseCase {
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(data: CreateAssignmentDTO) {
        const { userId, roleId } = data;

        const assignment = await this.assignmentRepository.findByUserAndRole(
            userId,
            roleId
        );

        if (assignment) {
            throw new ConflictError("User already has this role.");
        }

        return await this.assignmentRepository.create(data);
    }
}