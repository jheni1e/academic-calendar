import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class FindAssignmentByUserAndRoleUseCase {

    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(
        roleId: number,
        userId: number
    ) {

        const assignment =
            await this.assignmentRepository.findByUserAndRole(
                userId,
                roleId
            );

        if (!assignment) {
            throw new NotFoundError("Assignment not found.");
        }

        return assignment;

    }

}