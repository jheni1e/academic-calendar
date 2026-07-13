import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository.ts";
import { GetRolesUseCase } from "../usecases/GetRolesUseCase.ts";

export class GetRolesController {

    private readonly repository = new PrismaRoleRepository();

    private readonly useCase = new GetRolesUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const roles = await this.useCase.execute();

            return res.status(200).json(roles);

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