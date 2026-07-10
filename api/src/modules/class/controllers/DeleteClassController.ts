import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassRepository } from "../repositories/PrismaClassRepository.ts";
import { DeleteClassUseCase } from "../usecases/DeleteClassUseCase.ts";

export class DeleteClassController {

    private readonly repository = new PrismaClassRepository();

    private readonly useCase = new DeleteClassUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            await this.useCase.execute(Number(req.params.id));

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