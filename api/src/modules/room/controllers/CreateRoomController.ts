import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoomRepository } from "../repositories/PrismaRoomRepository.ts";
import { CreateRoomUseCase } from "../usecases/CreateRoomUseCase.ts";

export class CreateRoomController {

    private readonly repository = new PrismaRoomRepository();

    private readonly useCase = new CreateRoomUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const room = await this.useCase.execute(req.body);

            return res.status(201).json(room);

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