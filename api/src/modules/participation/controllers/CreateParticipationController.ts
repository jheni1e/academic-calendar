import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaParticipationRepository } from "../repositories/PrismaParticipationRepository.ts";
import { CreateParticipationUseCase } from "../usecases/CreateParticipationUseCase.ts";

export class CreateParticipationController {

    private readonly repository = new PrismaParticipationRepository();

    private readonly useCase = new CreateParticipationUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const participation = await this.useCase.execute(req.body);

            return res.status(201).json(participation);

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