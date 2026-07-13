import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRepository } from "../repositories/PrismaSubjectRepository.ts";
import { GetSubjectsUseCase } from "../usecases/GetSubjectsUseCase.ts";

export class GetSubjectsController {

    private readonly repository = new PrismaSubjectRepository();

    private readonly useCase = new GetSubjectsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjects = await this.useCase.execute();

            return res.status(200).json(subjects);

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