import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/AppError.ts";
import { CreateClassUserDTO, ClassUserResponseDTO } from "../dtos/ClassUserDto.ts";
import { createClassUser, deleteClassUser, findAllClassUser, findClassUserById, findClassUsersByClass, findClassUsersByClassAndUser, findClassUsersByUser } from "../services/classuser.service.ts";

export class ClassUserController {
    static async create(req: Request, res: Response) {
        const data: CreateClassUserDTO = req.body;
        try {
            const classUser = await createClassUser(data);

            return res.status(201).json(classUser);
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

    static async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            await deleteClassUser(id);
            return res.status(204).send({ message: "Class user deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findClassUsersByClassAndUser(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const classUser = await findClassUsersByClassAndUser(id, res.locals.user.id);
            return res.status(200).json(classUser);

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findClassUserById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const classUser = await findClassUserById(id);

            return res.status(200).json(classUser);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }
    
    static async findClassUsersByUser(req: Request, res: Response) {
        const id = res.locals.id

        try {
            const classes = await findClassUsersByUser(id);
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

    static async findClassUsersByClass(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const classUsers = await findClassUsersByClass(id);
            return res.status(200).json(classUsers);

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllClassUser(req: Request, res: Response) {
        try {
            const classUsers = await findAllClassUser();
            
            return res.status(200).json(classUsers);
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