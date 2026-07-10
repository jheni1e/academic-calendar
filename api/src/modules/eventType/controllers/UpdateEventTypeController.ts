import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventTypeRepository } from "../repositories/PrismaEventTypeRepository.ts";
import { UpdateEventTypeUseCase } from "../usecases/UpdateEventTypeUseCase.ts";

export class UpdateEventTypeController {

    private readonly repository = new PrismaEventTypeRepository();

    private readonly useCase = new UpdateEventTypeUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const eventType = await this.useCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(eventType);

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