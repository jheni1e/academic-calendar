import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRoomRepository } from "../repositories/PrismaSubjectRoomRepository.ts";
import { CreateSubjectRoomUseCase } from "../usecases/CreateSubjectRoomUseCase.ts";

export class CreateSubjectRoomController {

    private readonly repository = new PrismaSubjectRoomRepository();

    private readonly useCase = new CreateSubjectRoomUseCase(this.repository);

    async handle(req: Request, res: Response) {

        try {

            const subjectRoom = await this.useCase.execute(req.body);

            return res.status(201).json(subjectRoom);

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