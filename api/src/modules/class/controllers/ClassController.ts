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
import { PrismaClassUserRepository } from "../../classUser/repositories/PrismaClassUserRepository.ts";
import { PrismaEventRepository } from "../../event/repositories/PrismaEventRepository.ts";

export class ClassController {
    private readonly repository = new PrismaClassRepository();
    private readonly classUserRepository = new PrismaClassUserRepository();
    private readonly eventRepository = new PrismaEventRepository();

    private readonly activateClassUseCase = new ActivateClassUseCase(this.repository);
    private readonly createClassUseCase = new CreateClassUseCase(this.repository);
    private readonly deactivateClassUseCase = new DeactivateClassUseCase(this.repository);
    private readonly deleteClassUseCase = new DeleteClassUseCase(this.repository, this.classUserRepository, this.eventRepository);
    private readonly findClassByIdUseCase = new FindClassByIdUseCase(this.repository);
    private readonly getClassesUseCase = new GetClassesUseCase(this.repository);
    private readonly updateClassUseCase = new UpdateClassUseCase(this.repository);

    async handleActivateClass(req: Request, res: Response) {

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
    async handleCreateClass(req: Request, res: Response) {

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
    async handleDeactivateClass(req: Request, res: Response) {

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
    async handleDeleteClass(req: Request, res: Response) {

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
    async handleFindClassById(req: Request, res: Response) {

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
    async handleGetClasses(req: Request, res: Response) {

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
    async handleUpdateClass(req: Request, res: Response) {

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