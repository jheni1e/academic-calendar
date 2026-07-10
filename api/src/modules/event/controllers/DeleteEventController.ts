import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRepository } from "../repositories/PrismaEventRepository.ts";
import { DeleteEventUseCase } from "../usecases/DeleteEventUseCase.ts";

export class DeleteEventController {

    private readonly repository = new PrismaEventRepository();

    private readonly useCase = new DeleteEventUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            await this.useCase.execute(
                Number(req.params.id)
            );

            return res.sendStatus(204);

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