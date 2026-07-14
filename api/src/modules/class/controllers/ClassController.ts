import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaClassRepository } from "../repositories/PrismaClassRepository.ts";
import { ActivateClassUseCase } from "../usecases/ActivateClassUseCase.ts";
import { CreateClassUseCase } from "../usecases/CreateClassUseCase.ts";
import { DeactivateClassUseCase } from "../usecases/DeactivateClassUseCase.ts";
import { DeleteClassUseCase } from "../usecases/DeleteClassUseCase.ts";
import { FindClassByIdUseCase } from "../usecases/FindClassByIdUseCase.ts";
import { GetClassesUseCase } from "../usecases/GetClassesUseCase.ts";
import { UpdateClassUseCase } from "../usecases/UpdateClassUseCase.ts";

export class ClassController {
    private readonly repository = new PrismaClassRepository();

    private readonly activateClassUseCase = new ActivateClassUseCase(this.repository);
    private readonly createClassUseCase = new CreateClassUseCase(this.repository);
    private readonly deactivateClassUseCase = new DeactivateClassUseCase(this.repository);
    private readonly deleteClassUseCase = new DeleteClassUseCase(this.repository);
    private readonly findClassByIdUseCase = new FindClassByIdUseCase(this.repository);
    private readonly getClassesUseCase = new GetClassesUseCase(this.repository);
    private readonly updateClassUseCase = new UpdateClassUseCase(this.repository);

    activate = async (req: Request, res: Response) => {

        try {
            const updatedClass = await this.activateClassUseCase.execute(
                Number(req.params.id)
            );
            return res.status(200).json(updatedClass);

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
    
    create = async (req: Request, res: Response) => {

        try {
            const newClass = await this.createClassUseCase.execute(req.body);
            return res.status(201).json(newClass);
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

    deactivate = async (req: Request, res: Response) => {

        try {
            const updatedClass = await this.deactivateClassUseCase.execute(
                Number(req.params.id)
            );
            return res.status(200).json(updatedClass);
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
            await this.deleteClassUseCase.execute(Number(req.params.id));
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
            const classEntity = await this.findClassByIdUseCase.execute(
                Number(req.params.id)
            );
            return res.status(200).json(classEntity);
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
            const classes = await this.getClassesUseCase.execute();
            return res.status(200).json(classes);
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
            const updatedClass = await this.updateClassUseCase.execute(
                Number(req.params.id),
                req.body
            );
            return res.status(200).json(updatedClass);
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