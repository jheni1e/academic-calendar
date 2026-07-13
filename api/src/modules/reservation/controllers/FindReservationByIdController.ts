import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaReservationRepository } from "../repositories/PrismaReservationRepository.ts";
import { FindReservationByIdUseCase } from "../usecases/FindReservationByIdUseCase.ts";

export class FindReservationByIdController {

    private readonly repository = new PrismaReservationRepository();

    private readonly useCase = new FindReservationByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const reservation = await this.useCase.execute(
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

}