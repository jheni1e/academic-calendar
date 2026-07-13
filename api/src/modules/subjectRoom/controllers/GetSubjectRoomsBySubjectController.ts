import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRoomRepository } from "../repositories/PrismaSubjectRoomRepository.ts";
import { GetSubjectRoomsBySubjectUseCase } from "../usecases/GetSubjectRoomsBySubjectUseCase.ts";

export class GetSubjectRoomsBySubjectController {

    private readonly repository = new PrismaSubjectRoomRepository();

    private readonly useCase = new GetSubjectRoomsBySubjectUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectRooms = await this.useCase.execute(
                Number(req.params.subjectId)
            );

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