import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRoleRepository } from "../repositories/PrismaEventRoleRepository.ts";
import { GetEventRolesUseCase } from "../usecases/GetEventRolesUseCase.ts";

export class GetEventRolesController {

    private readonly repository = new PrismaEventRoleRepository();

    private readonly useCase = new GetEventRolesUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const eventRoles = await this.useCase.execute();

            return res.status(200).json(eventRoles);

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