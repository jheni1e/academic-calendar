import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRoomRepository } from "../repositories/PrismaSubjectRoomRepository.ts";
import { UpdateSubjectRoomUseCase } from "../usecases/UpdateSubjectRoomUseCase.ts";

export class UpdateSubjectRoomController {

    private readonly repository = new PrismaSubjectRoomRepository();

    private readonly useCase = new UpdateSubjectRoomUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectRoom = await this.useCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(subjectRoom);

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