import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { GetSubjectInstructorsUseCase } from "../usecases/GetSubjectInstructorsUseCase.ts";

export class GetSubjectInstructorsController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    private readonly useCase = new GetSubjectInstructorsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectInstructors = await this.useCase.execute();

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