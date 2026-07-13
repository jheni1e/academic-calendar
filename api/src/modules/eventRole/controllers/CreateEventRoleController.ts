import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRoleRepository } from "../repositories/PrismaEventRoleRepository.ts";
import { CreateEventRoleUseCase } from "../usecases/CreateEventRoleUseCase.ts";

export class CreateEventRoleController {

    private readonly repository = new PrismaEventRoleRepository();

    private readonly useCase = new CreateEventRoleUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const eventRole = await this.useCase.execute(req.body);

            return res.status(201).json(eventRole);

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