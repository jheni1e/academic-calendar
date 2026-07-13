import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRepository } from "../repositories/PrismaSubjectRepository.ts";
import { CreateSubjectUseCase } from "../usecases/CreateSubjectUseCase.ts";

export class CreateSubjectController {

    private readonly repository = new PrismaSubjectRepository();

    private readonly useCase = new CreateSubjectUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subject = await this.useCase.execute(req.body);

            return res.status(201).json(subject);

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