import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateSubjectInstructorDTO, UpdateSubjectInstructorDTO } from "../dtos/SubjectInstructorDto.ts";
import { createSubjectInstructor, deleteSubjectInstructor, findAllSubjectInstructors, findSubjectInstructorById, findSubjectInstructorBySubjectAndInstructor, findSubjectInstructorsByInstructor, findSubjectInstructorsBySubject, getInstructorsBySubject, getSubjectsByInstructor, updateSubjectInstructor } from "../services/subjectinstructor.service.ts";
import { findUserById } from "../services/user.service.ts";
import { UserRole } from "../generated/prisma/enums.ts";

export class SubjectInstructorController {
    static async create(req: Request, res: Response) {
        const data: CreateSubjectInstructorDTO = req.body;

        try {
            const subjectInstructor = await createSubjectInstructor(data);
            return res.status(201).json(subjectInstructor);

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
            await deleteSubjectInstructor(id);
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

    static async update(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateSubjectInstructorDTO = req.body;

        try {
            const subjectInstructor = await updateSubjectInstructor(id, data);
            return res.status(201).json(subjectInstructor);

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ 
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllSubjectInstructors(req: Request, res: Response) {
        try {
            const subjectInstructors = await findAllSubjectInstructors();
            return res.status(200).json(subjectInstructors);

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findSubjectInstructorById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const subjectInstructor = await findSubjectInstructorById(id);
            return res.status(200).json(subjectInstructor);
            
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findSubjectInstructorsBySubject(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const subjectInstructors = await findSubjectInstructorsBySubject(id);

            return res.status(200).json(subjectInstructors);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findSubjectInstructorsByInstructor(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const subjects = await findSubjectInstructorsByInstructor(id);

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

    static async findSubjectInstructorBySubjectAndInstructor(req: Request, res: Response) {
        const subjectId: number = parseInt(req.params.id[0].toString());
        const instructorId: number = parseInt(req.params.id[1].toString());

        try {
            const subjectInstructor = await findSubjectInstructorBySubjectAndInstructor(subjectId, instructorId);

            return res.status(200).json(subjectInstructor);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findSubjectByInstructor(req: Request, res: Response) {
        const id = res.locals.user.id
        try {
            const subjects = await getSubjectsByInstructor(id)
            return res.status(200).send(subjects)
        
        } catch(error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message})
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findInstructorBySubject(req: Request, res: Response) {
        const { subjectId } = req.params
        try {
            const instructors = await getInstructorsBySubject(Number(subjectId))
            return res.status(200).send(instructors)
        
        } catch(error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message})
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    

}