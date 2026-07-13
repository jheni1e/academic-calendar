import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassUserRepository } from "../repositories/PrismaClassUserRepository.ts";
import { GetClassUsersByClassUseCase } from "../usecases/GetClassUsersByClassUseCase.ts";

export class GetClassUsersByClassController {

    private readonly repository = new PrismaClassUserRepository();

    private readonly useCase = new GetClassUsersByClassUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const classUsers = await this.useCase.execute(
                Number(req.params.classId)
            );

            return res.status(200).json(classUsers);

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