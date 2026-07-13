import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { GetSubjectInstructorsBySubjectUseCase } from "../usecases/GetSubjectInstructorsBySubjectUseCase.ts";

export class GetSubjectInstructorsBySubjectController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    private readonly useCase = new GetSubjectInstructorsBySubjectUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectInstructors = await this.useCase.execute(
                Number(req.params.subjectId)
            );

            return res.status(200).json(subjectInstructors);

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