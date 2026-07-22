import { Request, Response, NextFunction } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateClassDTO, UpdateClassDTO } from "../dtos/ClassDto.ts";
import { createClass, deleteClass, findAllClasses, findClassById, updateClass } from "../services/class.service.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";


export class ClassController {
    static async create(req: Request, res: Response) {
        const data: CreateClassDTO = req.body
        try {
            const classItem = await createClass(data);
            return res.status(201).json(classItem);

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async enable(req: Request, res: Response) {
        const classItem = res.locals.class
        try {
            await updateClass(classItem.class_id, { isActive: true})
            return res.status(200).send({ message: "Class activated"})

        } catch(error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async disable(req: Request, res: Response) {
        const classItem = res.locals.class

        try {
            await updateClass(classItem.class_id, { isActive: false})
            return res.status(200).send({ message: "Class disabled"})

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
            await deleteClass(id);
            return res.status(204).send({ message: "Class deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const classes = await findAllClasses();

            return res.status(200).json(classes);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findClassById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const classItem = await findClassById(id);

            return res.status(200).json(classItem);
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
        const data: UpdateClassDTO = req.body;
        const id: number = parseInt(req.params.id.toString());

        try {
            const updatedClass = await updateClass(id, data);

            return res.status(200).json(updatedClass);
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