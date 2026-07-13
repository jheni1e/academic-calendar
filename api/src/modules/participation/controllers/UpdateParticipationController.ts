import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaParticipationRepository } from "../repositories/PrismaParticipationRepository.ts";
import { UpdateParticipationUseCase } from "../usecases/UpdateParticipationUseCase.ts";

export class UpdateParticipationController {

    private readonly repository = new PrismaParticipationRepository();

    private readonly useCase = new UpdateParticipationUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const participation = await this.useCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(participation);

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