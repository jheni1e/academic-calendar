import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRoomRepository } from "../repositories/PrismaSubjectRoomRepository.ts";
import { DeleteSubjectRoomUseCase } from "../usecases/DeleteSubjectRoomUseCase.ts";

export class DeleteSubjectRoomController {

    private readonly repository = new PrismaSubjectRoomRepository();

    private readonly useCase = new DeleteSubjectRoomUseCase(this.repository);

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