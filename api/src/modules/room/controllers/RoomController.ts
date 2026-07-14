import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoomRepository } from "../repositories/PrismaRoomRepository.ts";
import { CreateRoomUseCase } from "../usecases/CreateRoomUseCase.ts";
import { DeleteRoomUseCase } from "../usecases/DeleteRoomUseCase.ts";
import { FindRoomByIdUseCase } from "../usecases/FindRoomByIdUseCase.ts";
import { GetRoomsUseCase } from "../usecases/GetRoomsUseCase.ts";
import { UpdateRoomUseCase } from "../usecases/UpdateRoomUseCase.ts";

export class RoomController {

    private readonly repository = new PrismaRoomRepository();

    private readonly createUseCase = new CreateRoomUseCase(this.repository);
    private readonly deleteUseCase = new DeleteRoomUseCase(this.repository);
    private readonly findUseCase = new FindRoomByIdUseCase(this.repository);
    private readonly getUseCase = new GetRoomsUseCase(this.repository);
    private readonly updateUseCase = new UpdateRoomUseCase(this.repository);

    create = async(req: Request, res: Response) => {

        try {

            const room = await this.createUseCase.execute(req.body);

            return res.status(201).json(room);

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

    getById = async (req: Request, res: Response) => {

        try {

            const room = await this.findUseCase.execute(
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

    getAll = async (req: Request, res: Response) => {

        try {

            const rooms = await this.getUseCase.execute();

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

    update = async (req: Request, res: Response) => {

        try {

            const room = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
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