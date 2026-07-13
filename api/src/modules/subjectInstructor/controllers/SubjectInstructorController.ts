import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { CreateSubjectInstructorUseCase } from "../usecases/CreateSubjectInstructorUseCase.ts";
import { DeleteSubjectInstructorUseCase } from "../usecases/DeleteSubjectInstructorUseCase.ts";
import { FindSubjectInstructorByIdUseCase } from "../usecases/FindSubjectInstructorByIdUseCase.ts";
import { GetSubjectInstructorsBySubjectUseCase } from "../usecases/GetSubjectInstructorsBySubjectUseCase.ts";
import { GetSubjectsByInstructorUseCase } from "../usecases/GetSubjectsByInstructorUseCase.ts";
import { GetSubjectInstructorsUseCase } from "../usecases/GetSubjectInstructorsUseCase.ts";
import { UpdateSubjectInstructorUseCase } from "../usecases/UpdateSubjectInstructorUseCase.ts";

export class SubjectInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    private readonly createUseCase = new CreateSubjectInstructorUseCase(this.repository);
    private readonly deleteUseCase = new DeleteSubjectInstructorUseCase(this.repository);
    private readonly findUseCase = new FindSubjectInstructorByIdUseCase(this.repository);
    private readonly getUseCase = new GetSubjectInstructorsUseCase(this.repository);
    private readonly getInstructorByInstructorUseCase = new GetSubjectInstructorsBySubjectUseCase(this.repository);
    private readonly getSubjectsByInstructorUseCase = new GetSubjectsByInstructorUseCase(this.repository);
    private readonly updateUseCase = new UpdateSubjectInstructorUseCase(this.repository);

    async handleCreate(req: Request, res: Response) {

        try {
            const subjectInstructor = await this.createUseCase.execute(req.body);

            return res.status(201).json(subjectInstructor);

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

            await this.deleteUseCase.execute(
                Number(req.params.id)
            );

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

            const subjectInstructor = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(subjectInstructor);

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

    async handleGet(req: Request, res: Response) {

        try {

            const subjectInstructors = await this.getUseCase.execute();

            return res.status(200).json(subjectInstructors);

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

    async handleGetInstructorByInstructor(req: Request, res: Response) {

        try {

            const subjectInstructors = await this.getInstructorByInstructorUseCase.execute(
                Number(req.params.subjectId)
            );

            return res.status(200).json(subjectInstructors);

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

    async handleGetSubjectsByInstructor(req: Request, res: Response) {

        try {

            const subjects = await this.getSubjectsByInstructorUseCase.execute(
                Number(req.params.instructorId)
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

    async handleUpdate(req: Request, res: Response) {

        try {

            const subjectInstructor = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(subjectInstructor);

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