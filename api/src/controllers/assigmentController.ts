import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateAssignmentDTO, UpdateAssignmentDTO, AssignmentResponseDTO } from "../dtos/AssignmentDto.ts";
import { createAssignment, deleteAssignment, findAllAssignments, findAssignmentById, findAssignmentsByRoleId, findAssignmentsByUserAndRole, findAssignmentsByUserId } from "../services/assignment.service.ts";

export class AssignmentController {
    static async create(req: Request, res: Response) {
        const data: CreateAssignmentDTO = req.body;
        try {
            const assignment = await createAssignment(data);

            return res.status(201).json(assignment);
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
            await deleteAssignment(id);

            return res.status(204).send({ message: "Assignment deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllAssignments(req: Request, res: Response) {
        try {
            const assignments = await findAllAssignments();

            return res.status(200).json(assignments);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAssignmentById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const assignment = await findAssignmentById(id);

            return res.status(200).json(assignment);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAssignmentsByRoleId(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const assignments = await findAssignmentsByRoleId(id);

            return res.status(200).json(assignments);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAssignmentsByUserAndRole(req: Request, res: Response) {
        const userId: number = parseInt(req.params.id[0].toString());
        const roleId: number = parseInt(req.params.id[1].toString());

        try {
            const assignment = await findAssignmentsByUserAndRole(userId, roleId);

            return res.status(200).json(assignment);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAssignmentsByUserId(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const assignment = await findAssignmentsByUserId(id);

            return res.status(200).json(assignment);
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