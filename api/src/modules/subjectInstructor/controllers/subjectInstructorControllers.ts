import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { CreateSubjectInstructorUseCase } from "../usecases/CreateSubjectInstructorUseCase.ts";
import { DeleteSubjectInstructorUseCase } from "../usecases/DeleteSubjectInstructorUseCase.ts";
import { FindSubjectInstructorByIdUseCase } from "../usecases/FindSubjectInstructorByIdUseCase.ts";
import { GetSubjectInstructorsBySubjectUseCase } from "../usecases/GetSubjectInstructorsBySubjectUseCase.ts";
import { GetSubjectInstructorsUseCase } from "../usecases/GetSubjectInstructorsUseCase.ts";
import { GetSubjectsByInstructorUseCase } from "../usecases/GetSubjectsByInstructorUseCase.ts";
import { PrismaSubjectRepository } from "../../subject/repositories/PrismaSubjectRepository.ts";
import { PrismaUserRepository } from "../../user/repositories/PrismaUserRepository.ts";

export class SubjectInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();
    private readonly subjectRepository = new PrismaSubjectRepository();
    private readonly userRepository = new PrismaUserRepository();

    private readonly createSI = new CreateSubjectInstructorUseCase(this.repository, this.subjectRepository, this.userRepository);
    private readonly deleteSI = new DeleteSubjectInstructorUseCase(this.repository);
    private readonly findSIById = new FindSubjectInstructorByIdUseCase(this.repository);
    private readonly getSIBySubject = new GetSubjectInstructorsBySubjectUseCase(this.repository);
    private readonly getAllSI = new GetSubjectInstructorsUseCase(this.repository);
    private readonly getSIByInstructor = new GetSubjectsByInstructorUseCase(this.repository);


    create = async (req: Request, res: Response) => {

        try {
            const subjectInstructor = await this.createSI.execute(req.body);

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

    delete = async (req: Request, res: Response) => {

        try {

            await this.deleteSI.execute(
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

    getAll = async (req: Request, res: Response) => {

        try {

            const subjectInstructors = await this.getAllSI.execute();

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

    getById = async (req: Request, res: Response) => {

        try {

            const subjectInstructor = await this.findSIById.execute(
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

    getBySubject = async (req: Request, res: Response) => {

        try {

            const subjectInstructors = await this.getSIBySubject.execute(
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

    getByInstructor = async (req: Request, res: Response) => {

        try {

            const subjects = await this.getSIByInstructor.execute(
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
}