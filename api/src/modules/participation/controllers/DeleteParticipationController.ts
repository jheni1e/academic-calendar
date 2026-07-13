import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaParticipationRepository } from "../repositories/PrismaParticipationRepository.ts";
import { DeleteParticipationUseCase } from "../usecases/DeleteParticipationUseCase.ts";

export class DeleteParticipationController {

    private readonly repository = new PrismaParticipationRepository();

    private readonly useCase = new DeleteParticipationUseCase(this.repository);

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