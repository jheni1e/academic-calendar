import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoomRepository } from "../repositories/PrismaRoomRepository.ts";
import { DeleteRoomUseCase } from "../usecases/DeleteRoomUseCase.ts";

export class DeleteRoomController {

    private readonly repository = new PrismaRoomRepository();

    private readonly useCase = new DeleteRoomUseCase(this.repository);

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