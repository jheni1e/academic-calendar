import { Assignment } from "../../../generated/prisma/client.ts";
import { CreateAssignmentDTO } from "../AssignmentDto.ts";

export interface IAssignmentRepository {

    create(
        data: CreateAssignmentDTO
    ): Promise<Assignment>;

    findById(
        assignmentId: number
    ): Promise<Assignment | null>;

    findAll(): Promise<Assignment[]>;

    findByUserId(
        userId: number
    ): Promise<Assignment[]>;
    
    delete(
        assignmentId: number
    ): Promise<void>;
}