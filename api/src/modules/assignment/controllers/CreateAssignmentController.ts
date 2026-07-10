import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { CreateAssignmentUseCase } from "../usecases/CreateAssignmentUseCase.ts";

export class CreateAssignmentController {

    private readonly repository = new PrismaAssignmentRepository();

    private readonly useCase = new CreateAssignmentUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const assignment = await this.useCase.execute(req.body);

            return res.status(201).json(assignment);

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