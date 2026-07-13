import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoomRepository } from "../repositories/PrismaRoomRepository.ts";
import { GetRoomsUseCase } from "../usecases/GetRoomsUseCase.ts";

export class GetRoomsController {

    private readonly repository = new PrismaRoomRepository();

    private readonly useCase = new GetRoomsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const rooms = await this.useCase.execute();

            return res.status(200).json(rooms);

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