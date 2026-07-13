import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRoleRepository } from "../repositories/PrismaEventRoleRepository.ts";
import { FindEventRoleByIdUseCase } from "../usecases/FindEventRoleByIdUseCase.ts";

export class FindEventRoleByIdController {

    private readonly repository = new PrismaEventRoleRepository();

    private readonly useCase = new FindEventRoleByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const eventRole = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(eventRole);

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