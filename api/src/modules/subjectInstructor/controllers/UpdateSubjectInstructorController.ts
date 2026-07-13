import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { UpdateSubjectInstructorUseCase } from "../usecases/UpdateSubjectInstructorUseCase.ts";

export class UpdateSubjectInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    private readonly useCase = new UpdateSubjectInstructorUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectInstructor = await this.useCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(subjectInstructor);

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