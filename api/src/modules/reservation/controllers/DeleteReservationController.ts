import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaReservationRepository } from "../repositories/PrismaReservationRepository.ts";
import { DeleteReservationUseCase } from "../usecases/DeleteReservationUseCase.ts";

export class DeleteReservationController {

    private readonly repository = new PrismaReservationRepository();

    private readonly useCase = new DeleteReservationUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            await this.useCase.execute(
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

}