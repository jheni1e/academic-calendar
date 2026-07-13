import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRoomRepository } from "../repositories/PrismaSubjectRoomRepository.ts";
import { GetSubjectRoomsUseCase } from "../usecases/GetSubjectRoomsUseCase.ts";

export class GetSubjectRoomsController {

    private readonly repository = new PrismaSubjectRoomRepository();

    private readonly useCase = new GetSubjectRoomsUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectRooms = await this.useCase.execute();

            return res.status(200).json(subjectRooms);

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