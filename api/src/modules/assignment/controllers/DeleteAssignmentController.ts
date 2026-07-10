import { Request, Response } from "express";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { DeleteAssignmentUseCase } from "../useCases/DeleteAssignmentUseCase.ts";

export class DeleteAssignmentController {

    async handle(req: Request, res: Response) {

        try {

            const repository = new PrismaAssignmentRepository();

            const useCase = new DeleteAssignmentUseCase(repository);

            await useCase.execute(Number(req.params.id));

            return res.status(204).send();

        } catch (error) {

            return res.status(400).json({
                message: error instanceof Error
                    ? error.message
                    : "Internal error."
            });

        }

    }

}