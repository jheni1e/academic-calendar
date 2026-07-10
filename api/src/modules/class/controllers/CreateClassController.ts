import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassRepository } from "../repositories/PrismaClassRepository.ts";
import { CreateClassUseCase } from "../usecases/CreateClassUseCase.ts";

export class CreateClassController {

    private readonly repository = new PrismaClassRepository();

    private readonly useCase = new CreateClassUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const newClass = await this.useCase.execute(req.body);

            return res.status(201).json(newClass);

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