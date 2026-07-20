import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { CreateReservationDTO, UpdateReservationDTO } from "../dtos/reservationDto.ts";
import { createReservation, deleteReservation, findAllReservations, findReservationByEvent, findReservationById, findReservationsByRoom, updateReservation } from "../services/reservation.service.ts";

export class ReservationController {
    static async create(req: Request, res: Response) {
        const data: CreateReservationDTO = req.body;
        try {
            const reservation = await createReservation(data);

            return res.status(201).json(reservation);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            await deleteReservation(id);

            return res.status(204).send({ message: "Reservation deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findReservationById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const reservation = await findReservationById(id);

            return res.status(200).json(reservation);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findReservationsByRoom(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const reservations = await findReservationsByRoom(id);

            return res.status(200).send(reservations);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }
    
    static async findReservationsByEvent(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const reservations = await findReservationByEvent(id);

            return res.status(200).send(reservations);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllReservations(req: Request, res: Response) {
        try {
            const reservations = await findAllReservations();

            return res.status(200).json(reservations);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async update(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateReservationDTO = req.body;

        try {
            const reservation = await updateReservation(id, data);

            return res.status(200).json(reservation);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }
}