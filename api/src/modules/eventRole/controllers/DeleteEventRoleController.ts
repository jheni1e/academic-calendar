import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRoleRepository } from "../repositories/PrismaEventRoleRepository.ts";
import { DeleteEventRoleUseCase } from "../usecases/DeleteEventRoleUseCase.ts";

export class DeleteEventRoleController {

    private readonly repository = new PrismaEventRoleRepository();

    private readonly useCase = new DeleteEventRoleUseCase(this.repository);

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