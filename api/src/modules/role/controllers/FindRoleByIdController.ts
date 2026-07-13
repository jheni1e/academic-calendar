import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository.ts";
import { FindRoleByIdUseCase } from "../usecases/FindRoleByIdUseCase.ts";

export class FindRoleByIdController {

    private readonly repository = new PrismaRoleRepository();

    private readonly useCase = new FindRoleByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const role = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(role);

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