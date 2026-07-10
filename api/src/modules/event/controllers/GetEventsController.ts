import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRepository } from "../repositories/PrismaEventRepository.ts";
import { GetEventsUseCase } from "../usecases/GetEventsUseCase.ts";

export class GetEventsController {

    private readonly repository = new PrismaEventRepository();

    private readonly useCase = new GetEventsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const events = await this.useCase.execute();

            return res.status(200).json(events);

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