import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRepository } from "../repositories/PrismaEventRepository.ts";
import { UpdateEventUseCase } from "../usecases/UpdateEventUseCase.ts";

export class UpdateEventController {

    private readonly repository = new PrismaEventRepository();

    private readonly useCase = new UpdateEventUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const event = await this.useCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(event);

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