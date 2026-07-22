import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ValidationError } from "../errors/ValidationError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId, roomId, priority } = req.body;

        const relation = await prisma.subjectroom.findFirst({
            where: { subjectId: subjectId, roomId: roomId },
        });


        if (relation) {
            throw new Error("Room already connected to the subject.");
        }

        if (priority !== undefined && priority < 1) {
            throw new ValidationError("The priority must be greater than zero.");
        }

        const priorityConflict = await prisma.subjectroom.priority.findFirst({
            where : {
                priority: priority
            }
        });

        if (priorityConflict) {
            throw new Error("Another room already has this priority.");
        }

        const room = await prisma.room.findUnique({
            where: {
                room_id: roomId
            }
        });

        if (!room) {
            throw new NotFoundError("Room not found.");
        }

        if (!room.is_active) {
            throw new Error("Room is not active.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId, instructorId } = req.body;

        const relation = await prisma.subjectinstructor.findFirst({
            where: { subjectId: subjectId, instructorId: instructorId },
        });

        if (!relation) {
            throw new Error("Instructor is not connected to the subject.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectRoomId: number = parseInt(req.params.id.toString());
        const { subjectId, roomId, priority } = req.body;

        const relation = await prisma.subjectroom.findFirst({
            where: { id: subjectRoomId, subjectId: subjectId, roomId: roomId },
        });

        if (!relation) {
            throw new Error("Room is not connected to the subject.");
        }

        if (priority !== undefined && priority < 1) {
            throw new ValidationError("The priority must be greater than zero.");
        }

        next();
    } catch (error) {
        next(error);
    }
}