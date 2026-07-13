import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassUserRepository } from "../repositories/PrismaClassUserRepository.ts";
import { GetClassesByUserUseCase } from "../usecases/GetClassesByUserUseCase.ts";

export class GetClassesByUserController {

    private readonly repository = new PrismaClassUserRepository();

    private readonly useCase = new GetClassesByUserUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const classes = await this.useCase.execute(
                Number(req.params.userId)
            );

            return res.status(200).json(classes);

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