import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRepository } from "../repositories/PrismaSubjectRepository.ts";
import { DeleteSubjectUseCase } from "../usecases/DeleteSubjectUseCase.ts";

export class DeleteSubjectController {

    private readonly repository = new PrismaSubjectRepository();

    private readonly useCase = new DeleteSubjectUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            await this.useCase.execute(
                Number(req.params.id)
            );

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