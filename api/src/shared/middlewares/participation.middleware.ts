import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, eventRoleId, eventId, status } = req.body;

        const user = await prisma.user.findFirst({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundError("User not found.");
        }

        const event = await prisma.events.findFirst({
            where: { id: eventId },
        });

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        const eventRole = await prisma.eventrole.findFirst({
            where: { id: eventRoleId },
        });

        if (!eventRole) {
            throw new NotFoundError("Event role not found.");
        }

        const participation = await prisma.participation.findFirst({
            where: { userId: userId, eventId: eventId },
        });

        if (participation) {
            throw new Error("User is already participating in this event.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participationId: number = parseInt(req.params.id.toString());

        const participation = await prisma.participation.findFirst({
            where: { id: participationId },
        });

        if (participation) {
            throw new Error("User is already participating in this event.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participationId: number = parseInt(req.params.id.toString());

        const participation = await prisma.participation.findFirst({
            where: { id: participationId },
        });

        if (participation) {
            throw new NotFoundError("Participation not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateParticipationExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participationId: number = parseInt(req.params.id.toString());

        const participation = await prisma.participation.findFirst({
            where: { id: participationId },
        });

        if (participation) {
            throw new NotFoundError("Participation not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
