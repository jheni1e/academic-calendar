import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaReservationRepository } from "../repositories/PrismaReservationRepository.ts";
import { UpdateReservationUseCase } from "../usecases/UpdateReservationUseCase.ts";

export class UpdateReservationController {

    private readonly repository = new PrismaReservationRepository();

    private readonly useCase = new UpdateReservationUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const reservation = await this.useCase.execute(
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