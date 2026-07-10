import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

import { CreateAssignmentDTO } from "../AssignmentDto.ts";

export class CreateAssignmentUseCase {
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(data: CreateAssignmentDTO) {

        const assignment =
            await this.assignmentRepository.findByUserAndRole(
                data.userId,
                data.roleId
            );

        if (assignment) {
            throw new Error("O usuário já possui esse papel.");
        }

        return await this.assignmentRepository.create(data);
    }
}