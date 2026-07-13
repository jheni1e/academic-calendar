import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassRepository } from "../repositories/PrismaClassRepository.ts";
import { ActivateClassUseCase } from "../usecases/ActivateClassUseCase.ts";

export class ActivateClassController {

    private readonly repository = new PrismaClassRepository();

    private readonly useCase = new ActivateClassUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const updatedClass = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(updatedClass);

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