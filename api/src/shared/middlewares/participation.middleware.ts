import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { findUserById } from "../../services/user.service.ts";
import { findEventById } from "../../services/event.service.ts";
import { findEventRoleById } from "../../services/eventrole.service.ts";
import { findParticipationById, findParticipationByUserAndEvent } from "../../services/participation.service.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, eventRoleId, eventId, status } = req.body;

        const user = await findUserById(userId)

        if (!user) {
            throw new NotFoundError("User not found.");
        }

        const event = await findEventById(eventId)

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        const eventRole = await findEventRoleById(eventRoleId)

        if (!eventRole) {
            throw new NotFoundError("Event role not found.");
        }

        const participation = await findParticipationByUserAndEvent(userId, eventId)

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

        const participation = await findParticipationById(participationId)

        if (participation) {
            throw new Error("User is already participating in this event.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDeleteByEventandUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { eventId, userId } = req.body

        const participation = await findParticipationByUserAndEvent(userId, eventId)

        if (!participation) {
            throw new Error("Invalid participation")
        }
        res.locals.participationId = participation.participation_id
        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participationId: number = parseInt(req.params.id.toString());
        const { eventId, status } = req.body;

        const participation = await findParticipationById(participationId)

        if (participation) {
            throw new NotFoundError("Participation not found.");
        }

        const event = await findEventById(eventId)

        if(!event)
            throw new NotFoundError("Event not found")

        const conflictingEvents = await prisma.event.findMany({
            where: {
                start_date: {
                    lte: event.end_date,
                },
                end_date: {
                    gte: event.start_date,
                },
            },
        });


        if (conflictingEvents.length > 0) {
            throw new Error("There is a schedule conflict with another confirmed event.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateParticipationExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participationId: number = parseInt(req.params.id.toString());

        const participation = await findParticipationById(participationId)

        if (participation) {
            throw new NotFoundError("Participation not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
