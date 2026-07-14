import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectRepository } from "../repositories/PrismaSubjectRepository.ts";
import { CreateSubjectUseCase } from "../usecases/CreateSubjectUseCase.ts";
import { DeleteSubjectUseCase } from "../usecases/DeleteSubjectUseCase.ts";
import { FindSubjectByIdUseCase } from "../usecases/FindSubjectByIdUseCase.ts";
import { GetSubjectsUseCase } from "../usecases/GetSubjectsUseCase.ts";
import { UpdateSubjectUseCase } from "../usecases/UpdateSubjectUseCase.ts";

export class SubjectController {

    private readonly repository = new PrismaSubjectRepository();

    private readonly createUseCase = new CreateSubjectUseCase(this.repository);
    private readonly deleteUseCase = new DeleteSubjectUseCase(this.repository);
    private readonly findUseCase = new FindSubjectByIdUseCase(this.repository);
    private readonly getUseCase = new GetSubjectsUseCase(this.repository);
    private readonly updateUseCase = new UpdateSubjectUseCase(this.repository);

    create = async (req: Request, res: Response) => {
        try {

            const subject = await this.createUseCase.execute(req.body);

            return res.status(201).json(subject);

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

    delete = async (req: Request, res: Response) => {

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

    getById = async (req: Request, res: Response) => {

        try {

            const subject = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(subject);

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

    getAll= async (req: Request, res: Response) => {

        try {

            const subjects = await this.getUseCase.execute();

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

    update = async (req: Request, res: Response) => {

        try {

            const subject = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(subject);

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