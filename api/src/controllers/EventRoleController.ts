import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/AppError.ts";
import { createEventRole, deleteEventRole, findAllEventRoles, findEventRoleById, updateEventRole } from "../services/eventrole.service.ts";
import { CreateEventRoleDTO, UpdateEventRoleDTO } from "../dtos/EventRoleDto.ts";

export class EventRoleController {
    static async create(req: Request, res: Response) {
        const data: CreateEventRoleDTO = req.body
        try {
            const eventRole = await createEventRole(data);
            return res.status(201).json(eventRole);

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
            await deleteEventRole(id);
            return res.status(204).send({ message: "Event role deleted successfully." });

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findEventRoleById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const eventRole = await findEventRoleById(id);
            return res.status(200).json(eventRole);
            
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
        
    }

    static async findAllEventRoles(req: Request, res: Response) {
        try {
            const eventRoles = await findAllEventRoles();
            return res.status(200).json(eventRoles);

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async updateEventRole(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateEventRoleDTO = req.body;

        try {
            const eventRole = await updateEventRole(id, data);
            return res.status(200).json(eventRole);

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