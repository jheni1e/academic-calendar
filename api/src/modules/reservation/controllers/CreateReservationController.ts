import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaReservationRepository } from "../repositories/PrismaReservationRepository.ts";
import { CreateReservationUseCase } from "../usecases/CreateReservationUseCase.ts";

export class CreateReservationController {

    private readonly repository = new PrismaReservationRepository();

    private readonly useCase = new CreateReservationUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const reservation = await this.useCase.execute(req.body);

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

}