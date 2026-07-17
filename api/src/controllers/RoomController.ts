import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateRoomDTO, UpdateRoomDTO } from "../dtos/RoomDto.ts";
import { createRoom, deleteRoom, findAllRooms, findRoomById, updateRoom } from "../services/room.service.ts";

export class RoomController {
    static async create(req: Request, res: Response) {
        const data: CreateRoomDTO = req.body;

        try {
            const room = await createRoom(data);

            return res.status(201).json(room);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            await deleteRoom(id);

            return res.status(204).send({ message: "Room deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findRoomById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const room = findRoomById(id);

            return res.status(200).json(room);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllRooms(req: Request, res: Response) {
        try {
            const rooms = await findAllRooms();

            return res.status(200).json(rooms);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async update(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateRoomDTO = req.body;

        try {
            const room = await updateRoom(id, data);

            return res.status(200).json(room);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }
}