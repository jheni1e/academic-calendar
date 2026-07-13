import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { DeleteAssignmentUseCase } from "../usecases/DeleteAssignmentUseCase.ts";

export class DeleteAssignmentController {

    private readonly repository = new PrismaAssignmentRepository();

    private readonly useCase = new DeleteAssignmentUseCase(this.repository);

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