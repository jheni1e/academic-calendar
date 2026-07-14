import { Assignment } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { CreateAssignmentDTO } from "../AssignmentDTO.ts";
import { IAssignmentRepository } from "./IAssignmentRepository.ts";

export class PrismaAssignmentRepository implements IAssignmentRepository {

    async create(
        data: CreateAssignmentDTO
    ): Promise<Assignment> {

        return prisma.assignment.create({
            data: {
                role_id: data.roleId,
                user_id: data.userId
            }
        });
    }

    async findById(
        assignmentId: number
    ): Promise<Assignment | null> {

        return prisma.assignment.findUnique({
            where: {
                assignment_id: assignmentId
            }
        });
    }

    async findAll(): Promise<Assignment[]> {

        return prisma.assignment.findMany();
    }

    async findByUserId(
        userId: number
    ): Promise<Assignment[]> {

        return prisma.assignment.findMany({
            where: {
                user_id: userId
            }
        });
    }

    async findByRoleId(
        roleId: number
    ): Promise<Assignment[]> {

        return prisma.assignment.findMany({
            where: {
                role_id: roleId
            }
        });
    }


    async findByUserAndRole(
        userId: number,
        roleId: number
    ): Promise<Assignment | null> {
    
        return prisma.assignment.findUnique({
            where: {
                role_id_user_id: {
                    role_id: roleId,
                    user_id: userId
                }
            }
        });
    
    }
    
    async delete(
        assignmentId: number
    ): Promise<void> {
    
        await prisma.assignment.delete({
            where: {
                assignment_id: assignmentId
            }
        });
    
    }
}