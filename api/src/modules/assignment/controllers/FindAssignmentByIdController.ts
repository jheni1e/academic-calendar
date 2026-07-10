import { Request, Response } from "express";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { FindAssignmentByIdUseCase } from "../useCases/FindAssignmentByIdUseCase.ts";

export class FindAssignmentByIdController {

    async handle(req: Request, res: Response) {

        try {

            const repository = new PrismaAssignmentRepository();

            const useCase = new FindAssignmentByIdUseCase(repository);

            const assignment = await useCase.execute(
                Number(req.params.id)
            );

            return res.json(assignment);

        } catch (error) {

            return res.status(404).json({
                message: error instanceof Error
                    ? error.message
                    : "Internal error."
            });

        }

    }

}