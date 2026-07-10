import { Request, Response } from "express";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { CreateAssignmentUseCase } from "../usecases/CreateAssignmentUseCase.ts";

export class CreateAssignmentController {

    async handle(req: Request, res: Response) {

        try {

            const repository = new PrismaAssignmentRepository();

            const useCase = new CreateAssignmentUseCase(repository);

            const assignment = await useCase.execute(req.body);

            return res.status(201).json(assignment);

        } catch (error) {

            return res.status(400).json({
                message: error instanceof Error
                    ? error.message
                    : "Internal error."
            });

        }

    }

}