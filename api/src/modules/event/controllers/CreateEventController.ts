import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRepository } from "../repositories/PrismaEventRepository.ts";
import { CreateEventUseCase } from "../usecases/CreateEventUseCase.ts";

export class CreateEventController {

    private readonly repository = new PrismaEventRepository();

    private readonly useCase = new CreateEventUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const event = await this.useCase.execute(req.body);

            return res.status(201).json(event);

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