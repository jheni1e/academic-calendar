import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { ConflictError } from "../errors/ConflictError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roomId, eventId, scheduleStart, scheduleEnd, status, isBlocked, description } = req.body;

        const start = new Date(scheduleStart);
        const end = new Date(scheduleEnd);

        if (start >= end) {
            throw new Error("Start date must be scheduled before finish date.");
        }

        const now = new Date();

        if (start < now) {
            throw new Error("Cannot create a reservation in the past.");
        }

        const hasConflict = await prisma.reservation.findFirst({
            where: {
                roomId,
                scheduleStart: {
                    lt: end,
                },
                scheduleEnd: {
                    gt: start,
                },
            },
        });

        if (hasConflict) {
            throw new ConflictError("This room is already being used.");
        }

        const room = await prisma.room.findFirst({
            where: { id: roomId },
        });

        if (!room) {
            throw new NotFoundError("Room not found.");
        }

        if (!room.is_active) {
            throw new Error("Room is not active.");
        }

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

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservationId: number = parseInt(req.params.id.toString());

        const reservation = await prisma.reservation.findFirst({
            where: { id: reservationId },
        });

        if (!reservation) {
            throw new NotFoundError("Reservation not found.");
        }

        if (reservation.isBlocked) {
            throw new Error("The reservation is blocked.");
        }

        if (reservation.status === "CONFIRMED") {
            throw new Error("Cannot delete confirmed reservation.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservationId: number = parseInt(req.params.id.toString());
        const { roomId, eventId, scheduleStart, scheduleEnd, status, isBlocked, description } = req.body;

        const reservation = await prisma.reservation.findFirst({
            where: { id: reservationId },
        });

        if (!reservation) {
            throw new NotFoundError("Reservation not found.");
        }

        if (reservation.isBlocked) {
            throw new Error("The reservation is blocked.");
        }

        const start = new Date(scheduleStart ?? reservation.scheduleStart);
        const end = new Date(scheduleEnd ?? reservation.scheduleEnd);

        if (start >= end) {
            throw new Error("Start date must be scheduled before finish date.");
        }

        if (start < new Date()) {
            throw new Error("Cannot update reservation to a past date.");
        }

        const hasConflict = await prisma.reservation.findFirst({
            where: {
                roomId: roomId ?? reservation.roomId,
                id: {
                    not: reservationId,
                },
                scheduleStart: {
                    lt: end,
                },
                scheduleEnd: {
                    gt: start,
                },
            },
        });

        if (hasConflict) {
            throw new ConflictError("This room is already being used.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
