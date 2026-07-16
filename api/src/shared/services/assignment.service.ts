import { Assignment } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import { CreateAssignmentDTO } from "../../modules/assignment/AssignmentDTO.ts";

export const createAssignment = async (
    data: CreateAssignmentDTO
): Promise<Assignment> => {

    return prisma.assignment.create({
        data: {
            role_id: data.roleId,
            user_id: data.userId
        }
    });
}

export const findAssignmentById = async (
    assignmentId: number
): Promise<Assignment | null> => {

    return prisma.assignment.findUnique({
        where: {
            assignment_id: assignmentId
        }
    });
}

export const findAllAssignmentsById = async (): Promise<Assignment[]> => {

    return prisma.assignment.findMany();
}

export const findAssignmentsByUserId = async (
    userId: number
): Promise<Assignment[]> => {

    return prisma.assignment.findMany({
        where: {
            user_id: userId
        }
    });
}

export const findAssignmentsByRoleId = async (
    roleId: number
): Promise<Assignment[]> => {

    return prisma.assignment.findMany({
        where: {
            role_id: roleId
        }
    });
}


export const findAssignmentsByUserAndRole = async (
    userId: number,
    roleId: number
): Promise<Assignment | null> => {

    return prisma.assignment.findUnique({
        where: {
            role_id_user_id: {
                role_id: roleId,
                user_id: userId
            }
        }
    });

}

export const deleteAssignment = async (
    assignmentId: number
): Promise<void> => {

    await prisma.assignment.delete({
        where: {
            assignment_id: assignmentId
        }
    });

}