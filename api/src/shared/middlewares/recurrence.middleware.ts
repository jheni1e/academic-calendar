import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { frequency, repeat_until, occurrences, created_by, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

        if (!frequency || !created_by) {
            throw new Error("Frequency and creator are mandatory.");
        }

        const user = await prisma.user.findFirst({
            where: { id: created_by },
        });

        if (!user) {
            throw new NotFoundError("Creator not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recurrenceId: number = parseInt(req.params.id.toString());

        const recurrence = await prisma.recurrence.findFirst({
            where: { id: recurrenceId },
        });

        if (recurrence) {
            throw new NotFoundError("Recurrence not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recurrenceId: number = parseInt(req.params.id.toString());

        const recurrence = await prisma.recurrence.findFirst({
            where: { id: recurrenceId },
        });

        if (recurrence) {
            throw new NotFoundError("Recurrence not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}