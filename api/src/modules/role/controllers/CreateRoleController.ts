import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository.ts";
import { CreateRoleUseCase } from "../usecases/CreateRoleUseCase.ts";

export class CreateRoleController {

    private readonly repository = new PrismaRoleRepository();

    private readonly useCase = new CreateRoleUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const role = await this.useCase.execute(req.body);

            return res.status(201).json(role);

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