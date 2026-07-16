import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";

export const validateActivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId: number = parseInt(req.params.id.toString());

        const room = await prisma.room.findFirst({
            where: { id: roomId },
        });

        if (!room) {
            throw new Error("Room not found.");
        }

        if (room.is_active) {
            throw new Error("Room already active.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

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

export const validateDectivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId: number = parseInt(req.params.id.toString());

        const room = await prisma.room.findFirst({
            where: { id: roomId },
        });

        if (!room) {
            throw new Error("Room not found.");
        }

        if (!room.is_active) {
            throw new Error("Room already deactivated.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId: number = parseInt(req.params.id.toString());

        const room = await prisma.room.findFirst({
            where: { id: roomId },
        });

        if (!room) {
            throw new Error("Room not found.");
        }

        if (room.is_active) {
            throw new Error("Active rooms can't be deleted.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId: number = parseInt(req.params.id.toString());
        const { title } = req.body;

        const room = await prisma.room.findFirst({
            where: { id: roomId },
        });

        if (!room) {
            throw new Error("Room not found.");
        }

        if (title !== undefined && !title.trim()) {
            throw new BadRequestError("Room title is mandatory.");
        }

        next();
    } catch (error) {
        next(error);
    }
}