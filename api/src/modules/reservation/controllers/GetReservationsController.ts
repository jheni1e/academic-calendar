import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaReservationRepository } from "../repositories/PrismaReservationRepository.ts";
import { GetReservationsUseCase } from "../usecases/GetReservationsUseCase.ts";

export class GetReservationsController {

    private readonly repository = new PrismaReservationRepository();

    private readonly useCase = new GetReservationsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const reservations = await this.useCase.execute();

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

}