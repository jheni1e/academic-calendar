import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { GetSubjectsByInstructorUseCase } from "../usecases/GetSubjectsByInstructorUseCase.ts";

export class GetSubjectsByInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    private readonly useCase = new GetSubjectsByInstructorUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjects = await this.useCase.execute(
                Number(req.params.instructorId)
            );

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