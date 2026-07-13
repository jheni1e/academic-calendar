import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoomRepository } from "../repositories/PrismaRoomRepository.ts";
import { FindRoomByIdUseCase } from "../usecases/FindRoomByIdUseCase.ts";

export class FindRoomByIdController {

    private readonly repository = new PrismaRoomRepository();

    private readonly useCase = new FindRoomByIdUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const room = await this.useCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(room);

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