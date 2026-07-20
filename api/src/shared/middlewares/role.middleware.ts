import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        if (!name.trim()) {
            throw new Error("Role name is required.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId: number = parseInt(req.params.id.toString());

        const role = await prisma.role.findFirst({
            where: { id: roleId },
        });

        if (role) {
            throw new NotFoundError("Role not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId: number = parseInt(req.params.id.toString());
        const { name } = req.body;

        const role = await prisma.role.findFirst({
            where: { id: roleId },
        });

        if (role) {
            throw new NotFoundError("Role not found.");
        }

        if (name !== undefined && !name.trim()) {
            throw new BadRequestError("Role name is mandatory.");
        }

        next();
    } catch (error) {
        next(error);
    }
}