import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassUserRepository } from "../repositories/PrismaClassUserRepository.ts";
import { CreateClassUserUseCase } from "../usecases/CreateClassUserUseCase.ts";

export class CreateClassUserController {

    private readonly repository = new PrismaClassUserRepository();

    private readonly useCase = new CreateClassUserUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const classUser = await this.useCase.execute(req.body);

            return res.status(201).json(classUser);

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