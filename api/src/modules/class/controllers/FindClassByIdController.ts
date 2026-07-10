import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassRepository } from "../repositories/PrismaClassRepository.ts";
import { FindClassByIdUseCase } from "../usecases/FindClassByIdUseCase.ts";

export class FindClassByIdController {

    private readonly repository = new PrismaClassRepository();

    private readonly useCase = new FindClassByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const classEntity = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(classEntity);

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