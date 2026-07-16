import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaAssignmentRepository } from "../repositories/PrismaAssignmentRepository.ts";
import { CreateAssignmentUseCase } from "../usecases/CreateAssignmentUseCase.ts";
import { DeleteAssignmentUseCase } from "../usecases/DeleteAssignmentUseCase.ts";
import { FindAssignmentByIdUseCase } from "../usecases/FindAssignmentByIdUseCase.ts";
import { GetAssignmentsUseCase } from "../usecases/GetAssignmentsUseCase.ts";

export class eAssignmentController {

    private readonly repository = new PrismaAssignmentRepository();

    private readonly createUseCase = new CreateAssignmentUseCase(this.repository);
    private readonly deleteUseCase = new DeleteAssignmentUseCase(this.repository);
    private readonly findUseCase = new FindAssignmentByIdUseCase(this.repository);
    private readonly getAssignmentsUseCase = new GetAssignmentsUseCase(this.repository);

    async handleCreate(req: Request, res: Response) {

        try {

            const assignment = await this.createUseCase.execute(req.body);

            return res.status(201).json(assignment);

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

    async handleDelete(req: Request, res: Response) {

        try {

            await this.deleteUseCase.execute(Number(req.params.id));

            return res.sendStatus(204);

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

    async handleFind(req: Request, res: Response) {

        try {

            const assignment = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(assignment);

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

    async handleGetAssignments(req: Request, res: Response) {

        try {

            const assignments = await this.getAssignmentsUseCase.execute();

            return res.status(200).json(assignments);

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

}