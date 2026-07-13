import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRepository } from "../repositories/PrismaSubjectRepository.ts";
import { FindSubjectByIdUseCase } from "../usecases/FindSubjectByIdUseCase.ts";

export class FindSubjectByIdController {

    private readonly repository = new PrismaSubjectRepository();

    private readonly useCase = new FindSubjectByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subject = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(subject);

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