import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { ForbiddenError } from "../errors/ForbiddenError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, eventTypeId, subjectId, classId, recurrence, createdBy } = req.body;

        if (!title.trim()) {
            throw new Error("Event title is required.");
        }

        if (!eventTypeId) {
            throw new Error("Event type is required.");
        }

        if (classId) {
            const classItem = await prisma.class.findFirst({
                where: { id: classId },
            });

            if (!classItem) {
                throw new Error("Class not found.");
            }
        }

        if (subjectId) {
            const subject = await prisma.subject.findFirst({
                where: { id: subjectId },
            });

            if (!subject) {
                throw new NotFoundError("Subject not found.");
            }
        }

        if (createdBy) {
            const creator = await prisma.user.findFirst({
                where: { id: createdBy },
            });

            if (!creator) {
                throw new NotFoundError("Creator doesn't exists.");
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId: number = parseInt(req.params.id[0].toString());

        const event = await prisma.events.findFirst({
            where: { id: eventId },
        });

        const reservation = await prisma.reservation.findFirst({
            where: { eventId: eventId },
        });

        if (reservation) {
            throw new ForbiddenError("Cannot delete an event with a reservation.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, eventTypeId, subjectId, classId, recurrence, createdBy } = req.body;
        const eventId: number = parseInt(req.params.id.toString());

        const event = await prisma.events.findFirst({
            where: { id: eventId },
        });

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        if (title !== undefined && !title.trim()) {
            throw new Error("Event title is required.");
        }

        const reservation = await prisma.reservation.findFirst({
            where: { eventId: eventId },
        });

        if (reservation.isBlocked) {
            throw new ForbiddenError("Cannot update an event with a blocked reservation.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateEventExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId: number = parseInt(req.params.id[0].toString());

        const event = await prisma.events.findFirst({
            where: { id: eventId },
        });

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
