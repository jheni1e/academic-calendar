import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { findClassById } from "../../services/class.service.ts";
import { findClassUsersByClassAndUser, findClassUsersByUser } from "../../services/classuser.service.ts";
import { UnauthorizedError } from "../errors/UnauthorizedError.ts";
import { findUserById } from "../../services/user.service.ts";

export const validateActivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());

        const classItem = await findClassById(classId)

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

        const classItem = await findClassById(classId)

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

        const classItem = await findClassById(classId)

        if(classItem) {
            if (classItem.is_active)
                return res.status(400).send({ message: "Class is still active"})
        }

        const events = await prisma.event.findMany({
            where: { class_id: classId },
        });

        if (!classItem) {
            throw new Error("Class not found.");
        }

        if (classItem.is_active) {
            throw new Error("Only inactive classes can be deleted.");
        }

        if (events.length > 0) {
            throw new ConflictError(
                "Cannot delete a class with events."
            );
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateClassExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());

        const classItem = await findClassById(classId)

        if (!classItem) {
            throw new NotFoundError("Class not found.");
        }

        res.locals.class = classItem

        next();
    } catch (err) {
        next(err);
    }
}

export const validateClassEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId = Number(req.params.id);
        const userId = res.locals.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new NotFoundError("User not found.");
        }

        if (user.role !== "APPRENTICE") {
            return next();
        }

        const isRegistered = await findClassUsersByClassAndUser(classId, userId);

        if (!isRegistered) {
            throw new UnauthorizedError("User is not enrolled in this class.");
        }

        return next();
    } catch (error) {
        next(error);
    }
};

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classId: number = parseInt(req.params.id.toString());
        const { name, isActive } = req.body;

        const classItem = await findClassById(classId)
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
