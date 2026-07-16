import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, roleId } = req.body;

        const assignment = await prisma.assignment.findFirst({
            where: { userId: userId, roleId: roleId },
        });

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

        const assignment = await prisma.assignment.findMany({
            where: { id: assignmentId },
        });

        if (assignment.length === 0) {
            throw new NotFoundError("Assignment not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateAssignmentExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const assignmentId: number = parseInt(req.params.id.toString());

        const assignment = await await prisma.assignment.findMany({
            where: { id: assignmentId },
        });

        if (assignment.length === 0) {
            throw new NotFoundError("Assignment not found.");
        }

        req.assignment = assignment;

        next();
    } catch (err) {
        next(err);
    }
}

export const validateAssignmentExistsByUserAndRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = parseInt(req.params.id[0].toString());
        const roleId: number = parseInt(req.params.id[1].toString());

        const assignment = await await prisma.assignment.findMany({
            where: { userId: userId, roleId: roleId },
        });

        if (assignment.length === 0) {
            throw new NotFoundError("Assignment not found.");
        }

        req.assignment = assignment;

        next();
    } catch (err) {
        next(err);
    }
}
