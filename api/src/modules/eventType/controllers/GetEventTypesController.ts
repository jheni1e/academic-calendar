import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventTypeRepository } from "../repositories/PrismaEventTypeRepository.ts";
import { GetEventTypesUseCase } from "../usecases/GetEventTypesUseCase.ts";

export class GetEventTypesController {

    private readonly repository = new PrismaEventTypeRepository();

    private readonly useCase = new GetEventTypesUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const eventTypes = await this.useCase.execute();

            return res.status(200).json(eventTypes);

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