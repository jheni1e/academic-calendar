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
        const { title, capacity, description } = req.body;

        if (title !== undefined && !title.trim()) {
            throw new BadRequestError("Room title is mandatory.");
        }

        const isTitleUnique = await prisma.room.findFirst({
            where: {
                title: title
            }
        });

        if (isTitleUnique.length > 0) {
            throw new Error("A room is already using that title.");
        }

        if (capacity <= 0) {
            throw new Error("Capacity must be greater than one.");
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

        const subjectRoomConnection = await prisma.subjectroom.findFirst({
            where: {
                room_id: roomId
            }
        });

        if (subjectRoomConnection) {
            throw new Error("The room is linked to a subject.");
        }

        const reservationsConfirmed = await prisma.reservation.findFirst({
            where: {
                roomId: roomId
            }
        });

        if (reservationsConfirmed) {
            throw new Error("There is one or more reservations confirmed linked to this room.");
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

        const subjectRoomConnection = await prisma.subjectroom.findFirst({
            where: {
                room_id: roomId
            }
        });

        if (subjectRoomConnection) {
            throw new Error("The room is linked to a subject.");
        }

        const reservationsConfirmed = await prisma.reservation.findFirst({
            where: {
                roomId: roomId
            }
        });

        if (reservationsConfirmed) {
            throw new Error("There is one or more reservations confirmed linked to this room.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId: number = parseInt(req.params.id.toString());
        const { title, capacity, description, is_active } = req.body;

        const room = await prisma.room.findFirst({
            where: { id: roomId },
        });

        if (!room) {
            throw new Error("Room not found.");
        }

        if (title !== undefined && !title.trim()) {
            throw new BadRequestError("Room title is mandatory.");
        }

        const isTitleUnique = await prisma.room.findFirst({
            where: {
                title: title
            }
        });

        if (isTitleUnique.length > 0) {
            throw new Error("A room is already using that title.");
        }

        if (capacity <= 0) {
            throw new Error("Capacity must be greater than one.");
        }

        next();
    } catch (error) {
        next(error);
    }
}