import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id[0].toString());
        const userId: number = parseInt(req.params.id[1].toString());

        const classUser = await prisma.class.findFirst({
            where: { classId: classId, userId: userId },
        });

        if (classUser) {
            throw new ConflictError("The user already belongs to this class..");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classUserId: number = parseInt(req.params.id[1].toString());

        const classUser = await prisma.class.findFirst({
            where: { id: classUserId },
        });

        if (!classUser) {
            throw new NotFoundError("Assignment not found.");
        }

        // TODO: Need User Type Verification before delete!

        next();
    } catch (error) {
        next(error);
    }
}

export const validateClassUserExistsByClassAndUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id[0].toString());
        const userId: number = parseInt(req.params.id[1].toString());

        const classUser = await prisma.class.findFirst({
            where: { classId: classId, userId: userId },
        });

        if (!classUser) {
            throw new NotFoundError("Assignment not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateClassUserExistsByClassUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classUserId: number = parseInt(req.params.id[0].toString());

        const classUser = await prisma.class.findFirst({
            where: { classUserId: classUserId },
        });

        if (!classUser) {
            throw new NotFoundError("Assignment not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
