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

    private readonly createSubject = new CreateSubjectRoomUseCase(this.repository);
    private readonly deleteSubject = new DeleteSubjectRoomUseCase(this.repository);
    private readonly getSRtByRoom = new GetSubjectRoomsByRoomUseCase(this.repository);
    private readonly getSRBySubject = new GetSubjectRoomsBySubjectUseCase(this.repository);
    private readonly getAllSR = new GetSubjectRoomsUseCase(this.repository);
    private readonly updateSR = new UpdateSubjectRoomUseCase(this.repository);


    create = async (req: Request, res: Response) => {

        try {

            const subjectRoom = await this.createSubject.execute(req.body);

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

    delete = async (req: Request, res: Response) => {

        try {

            await this.deleteSubject.execute(
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

    getAll = async (req: Request, res: Response) => {

        try {

            const subjectRooms = await this.getAllSR.execute();

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

    getByRoomID = async (req: Request, res: Response) => {

        try {

            const subjectRooms = await this.getSRtByRoom.execute(
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

    getBySubject = async (req: Request, res: Response) => {

        try {

            const subjectRoom = await this.getSRBySubject.execute(
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

    update = async (req: Request, res: Response) => {

        try {

            const subjectRoom = await this.updateSR.execute(
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