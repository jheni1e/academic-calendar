import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { ForbiddenError } from "../errors/ForbiddenError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        if (!name.trim()) {
            throw new Error("Event type name is required.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventTypeId: number = parseInt(req.params.id.toString());

        const eventType =await prisma.eventtype.findFirst({
            where: { id: eventTypeId },
        });

        if (!eventType) {
            throw new NotFoundError("Event type not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const eventTypeId: number = parseInt(req.params.id.toString());

        const eventType =await prisma.eventtype.findFirst({
            where: { id: eventTypeId },
        });

        if (!eventType) {
            throw new NotFoundError("Event type not found.");
        }

        if (name !== undefined && !name.trim()) {
            throw new Error("Event type name is mandatory.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateEventRoleExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventTypeId: number = parseInt(req.params.id[0].toString());

        const eventType = await prisma.eventtype.findFirst({
            where: { id: eventTypeId },
        });

        if (!eventType) {
            throw new NotFoundError("Event type not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
