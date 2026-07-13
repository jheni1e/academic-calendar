import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository.ts";
import { CreateRoleUseCase } from "../usecases/CreateRoleUseCase.ts";
import { DeleteRoleUseCase } from "../usecases/DeleteRoleUseCase.ts";
import { FindRoleByIdUseCase } from "../usecases/FindRoleByIdUseCase.ts";
import { GetRolesUseCase } from "../usecases/GetRolesUseCase.ts";
import { CreateRoleDTO } from "../RoleDTO.ts";
import { UpdateRoleUseCase } from "../usecases/UpdateRoleUseCase.ts";

export class RoleController {

    private readonly repository = new PrismaRoleRepository();

    private readonly createUseCase = new CreateRoleUseCase(this.repository);
    private readonly deleteUseCase = new DeleteRoleUseCase(this.repository);
    private readonly findUseCase = new FindRoleByIdUseCase(this.repository);
    private readonly getUseCase = new GetRolesUseCase(this.repository);
    private readonly updateUseCase = new UpdateRoleUseCase(this.repository);

    async handleCreate(req: Request, res: Response) {
        const data : CreateRoleDTO = req.body

        try {

            const role = await this.createUseCase.execute(req.body);

            return res.status(201).json(role);

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

            const role = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(role);

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

            const roles = await this.getUseCase.execute();

            return res.status(200).json(roles);

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

            const role = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(role);

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