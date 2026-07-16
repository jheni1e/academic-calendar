import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";

import { PrismaClassUserRepository } from "../modules/classUser/repositories/PrismaClassUserRepository.ts";
import { CreateClassUserUseCase } from "../modules/classUser/usecases/CreateClassUserUseCase.ts";
import { DeleteClassUserUseCase } from "../modules/classUser/usecases/DeleteClassUserUseCase.ts";
import { FindClassUserByClassAndUserUseCase } from "../modules/classUser/usecases/FindClassUserByClassAndUserUseCase.ts";
import { FindClassUserByIdUseCase } from "../modules/classUser/usecases/FindClassUserByIdUseCase.ts";
import { GetClassesByUserUseCase } from "../modules/classUser/usecases/GetClassesByUserUseCase.ts";
import { GetClassUsersByClassUseCase } from "../modules/classUser/usecases/GetClassUsersByClassUseCase.ts";
import { GetClassUsersUseCase } from "../modules/classUser/usecases/GetClassUsersUseCase.ts";

export class ClassUserController {

    private readonly repository = new PrismaClassUserRepository();

    private readonly createClassUserUseCase = new CreateClassUserUseCase(this.repository);
    private readonly deleteClassUserUseCase = new DeleteClassUserUseCase(this.repository);
    private readonly findClassUserByClassAndUserUseCase = new FindClassUserByClassAndUserUseCase(this.repository);
    private readonly findClassUserByIdUseCase = new FindClassUserByIdUseCase(this.repository);
    private readonly getClassesByUserUseCase = new GetClassesByUserUseCase(this.repository);
    private readonly getClassUsersByClassUseCase = new GetClassUsersByClassUseCase(this.repository);
    private readonly getClassUsersUseCase = new GetClassUsersUseCase(this.repository);
    

    create = async (req: Request, res: Response) => {

        try {
            const classUser = await this.createClassUserUseCase.execute(req.body);
            return res.status(201).json(classUser);
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
            await this.deleteClassUserUseCase.execute(Number(req.params.id));
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

    getByClassAndUser = async (req: Request, res: Response) => {

        try {
            const classUser = await this.findClassUserByClassAndUserUseCase.execute(
                Number(req.params.classId),
                res.locals.user.id
            );
            return res.status(200).json(classUser);
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

    async handleFindClassUserById(req: Request, res: Response) {

        try {
            const classUser = await this.findClassUserByIdUseCase.execute(
                Number(req.params.id)
            );
            return res.status(200).json(classUser);
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
    
    getByUser = async (req: Request, res: Response) => {

        try {
            const classes = await this.getClassesByUserUseCase.execute(
                Number(res.locals.user.id)
            );
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
    async handleGetClassUsersByClass(req: Request, res: Response) {

        try {

            const classUsers = await this.getClassUsersByClassUseCase.execute(
                Number(req.params.classId)
            );

            return res.status(200).json(classUsers);

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
    async handleGetClassUsers(req: Request, res: Response) {

        try {

            const classUsers = await this.getClassUsersUseCase.execute();

            return res.status(200).json(classUsers);

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