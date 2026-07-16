import { Assignment, Role } from "../../../generated/prisma/client.ts";
import { CreateAssignmentDTO } from "../../../dtos/AssignmentDto.ts";

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
    ): Promise<(Assignment & {role: Role})[]>;

    findByRoleId(
        roleId: number
    ): Promise<Assignment[]>;

    findByUserAndRole(
        userId: number,
        roleId: number
    ): Promise<Assignment | null>;
    
    delete(
        assignmentId: number
    ): Promise<void>;
}