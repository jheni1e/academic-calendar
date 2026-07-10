import { Request, Response } from "express";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { GetAssignmentsUseCase } from "../useCases/GetAssignmentsUseCase.ts";

export class GetAssignmentsController {

    async handle(req: Request, res: Response) {

        try {

            const repository = new PrismaAssignmentRepository();

            const useCase = new GetAssignmentsUseCase(repository);

            const assignments = await useCase.execute();

            return res.json(assignments);

        } catch (error) {

            return res.status(400).json({
                message: error instanceof Error
                    ? error.message
                    : "Internal error."
            });

        }

    }

}