import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventTypeRepository } from "../repositories/PrismaEventTypeRepository.ts";
import { FindEventTypeByIdUseCase } from "../usecases/FindEventTypeByIdUseCase.ts";

export class FindEventTypeByIdController {

    private readonly repository = new PrismaEventTypeRepository();

    private readonly useCase = new FindEventTypeByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const eventType = await this.useCase.execute(
                Number(req.params.id)
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