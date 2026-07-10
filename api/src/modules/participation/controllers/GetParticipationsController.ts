import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaParticipationRepository } from "../repositories/PrismaParticipationRepository.ts";
import { GetParticipationsUseCase } from "../usecases/GetParticipationsUseCase.ts";

export class GetParticipationsController {

    private readonly repository = new PrismaParticipationRepository();

    private readonly useCase = new GetParticipationsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const participations = await this.useCase.execute();

            return res.status(200).json(participations);

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