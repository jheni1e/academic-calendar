import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventTypeRepository } from "../repositories/PrismaEventTypeRepository.ts";
import { CreateEventTypeUseCase } from "../usecases/CreateEventTypeUseCase.ts";

export class CreateEventTypeController {

    private readonly repository = new PrismaEventTypeRepository();

    private readonly useCase = new CreateEventTypeUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const eventType = await this.useCase.execute(req.body);

            return res.status(201).json(eventType);

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