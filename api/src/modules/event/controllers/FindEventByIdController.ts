import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRepository } from "../repositories/PrismaEventRepository.ts";
import { FindEventByIdUseCase } from "../usecases/FindEventByIdUseCase.ts";

export class FindEventByIdController {

    private readonly repository = new PrismaEventRepository();

    private readonly useCase = new FindEventByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const event = await this.useCase.execute(
                Number(req.params.id)
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