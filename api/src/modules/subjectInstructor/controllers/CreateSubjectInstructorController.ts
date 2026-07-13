import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { CreateSubjectInstructorUseCase } from "../usecases/CreateSubjectInstructorUseCase.ts";

export class CreateSubjectInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    private readonly useCase = new CreateSubjectInstructorUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectInstructor = await this.useCase.execute(req.body);

            return res.status(201).json(subjectInstructor);

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