import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { edv, name, birthdate, password, role } = req.body;

        if (!name || !edv || !password || !role) {
            throw new BadRequestError("Missing required fields.");
        }

        const exists = await prisma.user.findUnique({
            where: {
                edv: edv
            }
        });

        if (exists) {
            throw new ConflictError("User already has an account");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDisable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const edv: number = parseInt(req.params.id.toString());

        const exists = await prisma.user.findUnique({
            where: {
                edv: edv
            }
        });

        if (!exists) {
            throw new NotFoundError("User not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = parseInt(req.params.id.toString());

        if (Number.isNaN(userId)) {
            throw new Error("User Id is invalid.");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        next();
    } catch (error) {
        next(error);
    }
}
