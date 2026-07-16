import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRoomRepository } from "../repositories/PrismaSubjectRoomRepository.ts";
import { CreateSubjectRoomUseCase } from "../usecases/CreateSubjectRoomUseCase.ts";
import { DeleteSubjectRoomUseCase } from "../usecases/DeleteSubjectRoomUseCase.ts";
import { FindSubjectRoomByIdUseCase } from "../usecases/FindSubjectRoomByIdUseCase.ts";
import { GetSubjectRoomsByRoomUseCase } from "../usecases/GetSubjectRoomsByRoomUseCase.ts";
import { GetSubjectRoomsBySubjectUseCase } from "../usecases/GetSubjectRoomsBySubjectUseCase.ts";
import { GetSubjectRoomsUseCase } from "../usecases/GetSubjectRoomsUseCase.ts";
import { UpdateSubjectRoomUseCase } from "../usecases/UpdateSubjectRoomUseCase.ts";

export class SubjectRoomController {

    private readonly repository = new PrismaSubjectRoomRepository();

    private readonly createUseCase = new CreateSubjectRoomUseCase(this.repository);
    private readonly deleteUseCase = new DeleteSubjectRoomUseCase(this.repository);
    private readonly getByRoomUseCase = new GetSubjectRoomsByRoomUseCase(this.repository);
    private readonly getBySubjectUseCase = new GetSubjectRoomsBySubjectUseCase(this.repository);
    private readonly getAllUseCase = new GetSubjectRoomsUseCase(this.repository);
    private readonly updateUseCase = new UpdateSubjectRoomUseCase(this.repository);


    async handleCreate(req: Request, res: Response) {

        try {

            const subjectRoom = await this.createUseCase.execute(req.body);

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

    async handleDelete(req: Request, res: Response) {

        try {

            await this.deleteUseCase.execute(
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

    async handleGet(req: Request, res: Response) {

        try {

            const subjectRooms = await this.getAllUseCase.execute();

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

    async handleGetByRoomID(req: Request, res: Response) {

        try {

            const subjectRooms = await this.getByRoomUseCase.execute(
                Number(req.params.roomId)
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

    async handleGetBySubject(req: Request, res: Response) {

        try {

            const subjectRoom = await this.getBySubjectUseCase.execute(
                Number(req.params.id)
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

    async handleUpdate(req: Request, res: Response) {

        try {

            const subjectRoom = await this.updateUseCase.execute(
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