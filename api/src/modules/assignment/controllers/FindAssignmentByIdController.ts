import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { FindAssignmentByIdUseCase } from "../usecases/FindAssignmentByIdUseCase.ts";

export class FindAssignmentByIdController {

    private readonly repository = new PrismaAssignmentRepository();

    private readonly useCase = new FindAssignmentByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const assignment = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(assignment);

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