import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { GetAssignmentsUseCase } from "../usecases/GetAssignmentsUseCase.ts";

export class GetAssignmentsController {

    private readonly repository = new PrismaAssignmentRepository();

    private readonly useCase = new GetAssignmentsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const assignments = await this.useCase.execute();

            return res.status(200).json(assignments);

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