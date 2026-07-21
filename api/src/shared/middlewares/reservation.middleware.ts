import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { findRoomById } from "../../services/room.service.ts";
import { findEventById } from "../../services/event.service.ts";
import { findReservationById } from "../../services/reservation.service.ts";

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
                room_id,
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

        const room = await findRoomById(roomId)

        if (!room) {
            throw new NotFoundError("Room not found.");
        }

        if (!room.is_active) {
            throw new Error("Room is not active.");
        }

        const event = await findEventById(eventId)

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

        const reservation = await findReservationById(reservationId)

        if (!reservation) {
            throw new NotFoundError("Reservation not found.");
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

        const reservation = await findReservationById(reservationId)

        if (!reservation) {
            throw new NotFoundError("Reservation not found.");
        }

        // const hasConflict = await prisma.reservation.findFirst({
        //     where: {
        //         room_id: roomId ?? reservation.room_id,
        //         id: {
        //             not: reservationId,
        //         },
        //         scheduleStart: {
        //             lt: end,
        //         },
        //         scheduleEnd: {
        //             gt: start,
        //         },
        //     },
        // });

        // if (hasConflict) {
        //     throw new ConflictError("This room is already being used.");
        // }

        next();
    } catch (error) {
        next(error);
    }
}
