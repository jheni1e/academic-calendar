import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { PrismaAssignmentRepository } from "../../modules/assignment/repositories/PrismaAssignmentRepository.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { ConflictError } from "../errors/ConflictError.ts";

const assignmentRepository = new PrismaAssignmentRepository();

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, roleId } = req.body;

        const assignment = await assignmentRepository.findByUserAndRole(
            userId,
            roleId
        );

        if (assignment) {
            throw new ConflictError("User already has this role.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const assignmentId: number = parseInt(req.params.id.toString());
        
        const assignment =
            await assignmentRepository.findById(assignmentId);

        if (!assignment) {
            throw new NotFoundError("Assignment not found.");
        }

        //verify if can be deleted

        next();
    } catch (error) {
        next(error);
    }
}