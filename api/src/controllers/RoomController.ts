import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateRoomDTO, UpdateRoomDTO } from "../dtos/RoomDto.ts";
import { createRoom, deleteRoom, disableRoom, findAllRooms, findRoomById, getEventsByRoom, updateRoom } from "../services/room.service.ts";

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
            const room = await findRoomById(id);

            if (!room) {
                return res.status(404).send({
                    message: "Room not found"
                });
            }

            if (room.is_active) {
                return res.status(400).send({
                    message: "Room still active, cannot delete"
                });
            }

            await deleteRoom(id);

            return res.sendStatus(204);

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
            const room = await findRoomById(id);

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

    static async disable(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        
        try {
            await disableRoom(Number(id))

            return res.status(200).send({ message: "Room disabled"})
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }
            return res.status(500).json({ message: "Internal server error." });
        }

    }

    static async findEventsByRoom(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const events = await getEventsByRoom(id)
            return res.status(200).send(events)
        
        } catch(error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}