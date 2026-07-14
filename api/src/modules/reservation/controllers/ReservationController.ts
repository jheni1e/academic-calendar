import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaReservationRepository } from "../repositories/PrismaReservationRepository.ts";
import { CreateReservationUseCase } from "../usecases/CreateReservationUseCase.ts";
import { DeleteReservationUseCase } from "../usecases/DeleteReservationUseCase.ts";
import { FindReservationByIdUseCase } from "../usecases/FindReservationByIdUseCase.ts";
import { GetReservationsUseCase } from "../usecases/GetReservationsUseCase.ts";
import { UpdateReservationUseCase } from "../usecases/UpdateReservationUseCase.ts";
import { FindReservationByRoomUseCase } from "../usecases/FindReservationByRoom.ts";
import { NotBeforeError } from "jsonwebtoken";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";

export class ReservationController {

    private readonly repository = new PrismaReservationRepository();

    private readonly createUseCase = new CreateReservationUseCase(this.repository);
    private readonly deleteUseCase = new DeleteReservationUseCase(this.repository);
    private readonly findUseCase = new FindReservationByIdUseCase(this.repository);
    private readonly getUseCase = new GetReservationsUseCase(this.repository);
    private readonly updateUseCase = new UpdateReservationUseCase(this.repository);
    private readonly findByRoomUseCase = new FindReservationByRoomUseCase(this.repository)

    create = async (req: Request, res: Response) => {

        try {

            const reservation = await this.createUseCase.execute(req.body);

            return res.status(201).json(reservation);

        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Internal server error."
            });

        }

    }

    delete = async (req: Request, res: Response) => {

        try {

            await this.deleteUseCase.execute(
                Number(req.params.id)
            );

            return res.sendStatus(204);

        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Internal server error."
            });

        }

    }

    getById = async (req: Request, res: Response) => {

        try {

            const reservation = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(reservation);

        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Internal server error."
            });

        }

    }

    getByRoom = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const reservations = await this.findByRoomUseCase.execute(Number(id))
            return res.status(200).send(reservations)
        } catch (error) {
            if (error instanceof NotFoundError)
                return res.status(error.statusCode).send({ message: error.message})
            return res.status()
        }
    }

    getAll = async (req: Request, res: Response) => {

        try {

            const reservations = await this.getUseCase.execute();

            return res.status(200).json(reservations);

        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Internal server error."
            });

        }

    }

    update = async (req: Request, res: Response) => {

        try {

            const reservation = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(reservation);

        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Internal server error."
            });

        }

    }

}