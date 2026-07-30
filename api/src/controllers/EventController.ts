import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateEventDTO, UpdateEventDTO } from "../dtos/EventDto.ts";
import { createEvent, deleteEvent, findAllEvents, findEventsByClass, findEventById, updateEvent, findEventsByUser, findEventsByRoom, blockEvent, unblockEvent, confirmEvent, cancelEvent } from "../services/event.service.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { BadRequestError } from "../shared/errors/BadRequestError.ts";

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

            return res.status(200).send({ message: "Event deleted successfully." });
        } catch (error) {
            console.log(error)
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

    static async findEventsByRoom(req: Request, res: Response) {
        const roomId = Number(req.params.id);
    
        try {
            const events = await findEventsByRoom(roomId);
    
            return res.status(200).json(events);
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

    static async findEventsByUser(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const events = await findEventsByUser(Number(id))
            return res.status(200).send(events)
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(error.statusCode).send(error.message)
            }

            return res.status(500).send({ message: "Internal server error."})
        }
    }

    static async findEventByClass(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const event = await findEventsByClass(id);

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

    static async block(req: Request, res: Response) {
        const { id } = req.params

        try {
            await blockEvent(Number(id))
            return res.status(200).send({ message: "Event blocked!"})

        } catch (error) {
            if (error instanceof NotFoundError || error instanceof BadRequestError)
                return res.status(error.statusCode).send({ message: error.message})

            return res.status(500).send({ message : "Internal server error"})
        }
    }

    static async unblock(req: Request, res: Response) {
        const { id } = req.params

        try {
            await unblockEvent(Number(id))
            return res.status(200).send({ message: "Event unblocked!"})
            
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof BadRequestError)
                return res.status(error.statusCode).send({ message: error.message})

            return res.status(500).send({ message : "Internal server error"})
        }
    }

    static async confirm(req: Request, res: Response) {
        const { id } = req.params

        try {
            await confirmEvent(Number(id))
            return res.status(200).send({ message: "Event confirmed!"})
            
        } catch (error) {
            if (error instanceof AppError)
                return res.status(error.statusCode).send({ message: error.message})

            return res.status(500).send({ message : "Internal server error"})
        }
    }

    static async cancel(req: Request, res: Response) {
        const { id } = req.params

        try {
            await cancelEvent(Number(id))
            return res.status(200).send({ message: "Event cancelled!"})
            
        } catch (error) {
            if (error instanceof AppError)
                return res.status(error.statusCode).send({ message: error.message})

            return res.status(500).send({ message : "Internal server error"})
        }
    }
}