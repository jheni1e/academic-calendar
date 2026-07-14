import { IAssignmentRepository } from "../repositories/IAssignmentRepository.ts";

export class GetAssignmentsByUserUseCase{
    constructor(
        private readonly assignmentRepository: IAssignmentRepository
    ) {}

    async execute(userId: number){
        return await this.assignmentRepository.findByUserId(userId)
    }
}