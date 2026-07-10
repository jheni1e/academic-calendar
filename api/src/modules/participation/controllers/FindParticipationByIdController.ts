import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaParticipationRepository } from "../repositories/PrismaParticipationRepository.ts";
import { FindParticipationByIdUseCase } from "../usecases/FindParticipationByIdUseCase.ts";

export class FindParticipationByIdController {

    private readonly repository = new PrismaParticipationRepository();

    private readonly useCase = new FindParticipationByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const participation = await this.useCase.execute(
                Number(req.params.id)
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