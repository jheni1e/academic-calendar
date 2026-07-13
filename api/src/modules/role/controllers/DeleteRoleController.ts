import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository.ts";
import { DeleteRoleUseCase } from "../usecases/DeleteRoleUseCase.ts";

export class DeleteRoleController {

    private readonly repository = new PrismaRoleRepository();

    private readonly useCase = new DeleteRoleUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            await this.useCase.execute(
                Number(req.params.id)
            );

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