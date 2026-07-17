import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { deleteEvent, findAllEvents, findEventByClass, findEventById, updateEvent } from "../services/event.service.ts";

export class EventController {
    static async create(req: Request, res: Response) {
        const data: CreateEventDTO = req.body;
        try {
            const event = await createEvent(data);

            return res.status(201).json(event);
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
            await deleteEvent(id);

            return res.status(204).send({ message: "Event deleted successfully." });
        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findEventById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const event = await findEventById(id);

            return res.status(200).json(event);
        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findEventByClass(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const event = await findEventByClass(id);

            return res.status(200).json(event);
        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllEvents(req: Request, res: Response) {
        try {
            const events = await findAllEvents();

            return res.status(200).json(events);
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
        const data: UpdateEventDTO = req.body;

        try {
            const event = await updateEvent(id, data);

            return res.status(200).json(event);
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