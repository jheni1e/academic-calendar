import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassRepository } from "../repositories/PrismaClassRepository.ts";
import { GetClassesUseCase } from "../usecases/GetClassesUseCase.ts";

export class GetClassesController {

    private readonly repository = new PrismaClassRepository();

    private readonly useCase = new GetClassesUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const classes = await this.useCase.execute();

            return res.status(200).json(classes);

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