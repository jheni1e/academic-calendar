import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateSubjectDTO, UpdateSubjectDTO } from "../dtos/SubjectDto.ts";
import { createSubject, deleteSubject, findOnGoingSubjectsByInstructor, findAllSubjects, findSubjectById, updateSubject, findOnGoingSubjectsByClass, } from "../services/subject.service.ts";

export class SubjectController {
    static async create(req: Request, res: Response) {
        const data: CreateSubjectDTO = req.body;

        try {
            const subject = await createSubject(data);

            return res.status(201).json(subject);
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
            await deleteSubject(id);

            return res.status(204).send({ message: "Subject deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findSubjectById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const subject = await findSubjectById(id);

            return res.status(200).json(subject);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllSubjects(req: Request, res: Response) {
        try {
            const subjects = await findAllSubjects();

            return res.status(200).json(subjects);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findOnGoingSubjectsByInstructor(
        req: Request,
        res: Response
    ) {
        const instructorId = parseInt(
            req.params.instructorId.toString()
        );
    
        try {
            const subjects = await findOnGoingSubjectsByInstructor(
                instructorId
            );
    
            return res.status(200).json(subjects);
    
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

    static async findOnGoingSubjectsByClass(
        req: Request,
        res: Response
    ) {
        const classId = parseInt(
            req.params.classId.toString()
        );
    
        try {
            const subjects = await findOnGoingSubjectsByClass(
                classId
            );
    
            return res.status(200).json(subjects);
    
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

    static async update(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateSubjectDTO = req.body;

        try {
            const subject = await updateSubject(id, data);

            return res.status(200).json(subject);
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