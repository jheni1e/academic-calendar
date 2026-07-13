import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassUserRepository } from "../repositories/PrismaClassUserRepository.ts";
import { DeleteClassUserUseCase } from "../usecases/DeleteClassUserUseCase.ts";

export class DeleteClassUserController {

    private readonly repository = new PrismaClassUserRepository();

    private readonly useCase = new DeleteClassUserUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            await this.useCase.execute(Number(req.params.id));

            return res.sendStatus(204);

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