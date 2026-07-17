import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateEventTypeDTO, UpdateEventTypeDTO } from "../dtos/EventTypeDTO.ts";
import { createEventType, deleteEventType, findAllEventTypes, findEventTypeById, updateEventType } from "../services/eventtype.service.ts";
export class CreateEventTypeController {
    static async create(req: Request, res: Response) {
        const data: CreateEventTypeDTO = req.body;
        try {
            const eventType = await createEventType(req.body);

            return res.status(201).json(eventType);
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
            await deleteEventType(id);

            return res.status(204).send({ message: "Event type deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    async handleFind(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const eventType = await findEventTypeById(id);

            return res.status(200).json(eventType);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllEventTypes(req: Request, res: Response) {
        try {
            const eventTypes = await findAllEventTypes();

            return res.status(200).json(eventTypes);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    async handleUpdate(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateEventTypeDTO = req.body;

        try {
            const eventType = await updateEventType(id, data);

            return res.status(200).json(eventType);
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