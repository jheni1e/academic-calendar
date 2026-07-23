import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { ForbiddenError } from "../errors/ForbiddenError.ts";
import { findEventTypeById } from "../../services/eventtype.service.ts";
import { EventType } from "../../generated/prisma/enums.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const { eventType } = req.body

        if (!name.trim()) {
            throw new Error("Event type name is required.");
        }

        if (!Object.values(EventType).includes(eventType)) {
            throw new BadRequestError("Invalid event type");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventTypeId: number = parseInt(req.params.id.toString());

        const eventType = await findEventTypeById(eventTypeId)

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

        const eventType = await findEventTypeById(eventTypeId)

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

        const eventType = await findEventTypeById(eventTypeId)

        if (!eventType) {
            throw new NotFoundError("Event type not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
