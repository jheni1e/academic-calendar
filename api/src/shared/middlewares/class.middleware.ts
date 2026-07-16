import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateActivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());

        const classItem = await prisma.class.findFirst({
            where: { id: classId },
        });

        if (!classItem) {
            throw new Error("Class not found.");
        }

        if (classItem.is_active) {
            throw new Error("Class already active.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, isActive } = req.body;

        if (!name.trim()) {
            throw new Error("Class name is required.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDectivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());

        const classItem = await prisma.class.findFirst({
            where: { id: classId },
        });

        if (!classItem) {
            throw new Error("Class not found.");
        }

        if (!classItem.is_active) {
            throw new Error("Class already inactive.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());

        const classItem = await prisma.class.findFirst({
            where: { id: classId },
        });

        const users = await prisma.users.findMany({
            where: { classId: classId },
        });

        const events = await prisma.events.findMany({
            where: { classId: classId },
        });

        if (!classItem) {
            throw new Error("Class not found.");
        }

        if (classItem.is_active) {
            throw new Error("Only inactive classes can be deleted.");
        }

        if (users.length > 0)
            throw new ConflictError(
                "Cannot delete a class with enrolled users."
            );

        if (events.length > 0) {
            throw new ConflictError(
                "Cannot delete a class with events."
            );
        }

        // TODO: Need User Type Verification before delete!

        // TODO: Verify if the class has subjects before deleting.

        next();
    } catch (error) {
        next(error);
    }
}

export const validateClassExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());

        const classItem = await prisma.class.findFirst({
            where: { id: classId },
        });

        if (!classItem) {
            throw new NotFoundError("Class not found.");
        }

        req.class = classItem;

        next();
    } catch (err) {
        next(err);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());
        const { name, isActive } = req.body;

        const classItem = await prisma.class.findFirst({
            where: { id: classId },
        });

        if (!classItem) {
            throw new Error("Class not found.");
        }

        if (name !== undefined && !name.trim()) {
            throw new Error("Class name is required.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
