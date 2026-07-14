import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class GetAssignmentsByRoleUseCase {
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(roleId: number) {
        return await this.assignmentRepository.findByRoleId(roleId);
    }
}