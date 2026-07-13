import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassUserRepository } from "../repositories/PrismaClassUserRepository.ts";
import { FindClassUserByIdUseCase } from "../usecases/FindClassUserByIdUseCase.ts";

export class FindClassUserByIdController {

    private readonly repository = new PrismaClassUserRepository();

    private readonly useCase = new FindClassUserByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const classUser = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(classUser);

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