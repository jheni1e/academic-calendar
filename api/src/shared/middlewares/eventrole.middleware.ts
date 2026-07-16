import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        if (!name.trim()) {
            throw new Error("Class name is required.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventRoleId: number = parseInt(req.params.id.toString());

        const eventRole = await prisma.eventrole.findFirst({
            where: { id: eventRoleId },
        });

        if (!eventRole) {
            throw new NotFoundError("Event role not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const eventRoleId: number = parseInt(req.params.id.toString());

        const eventRole = await prisma.eventrole.findFirst({
            where: { id: eventRoleId },
        });

        if (!eventRole) {
            throw new NotFoundError("Event role not found.");
        }

        if (name !== undefined && !name.trim()) {
            throw new Error("Event role name is mandatory.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateEventTypeExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventRoleId: number = parseInt(req.params.id[0].toString());

        const eventRole = await prisma.eventrole.findFirst({
            where: { id: eventRoleId },
        });

        if (!eventRole) {
            throw new NotFoundError("Event Role not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
