import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";

import { PrismaRoleRepository } from "../modules/role/repositories/PrismaRoleRepository.ts";
import { CreateRoleUseCase } from "../modules/role/usecases/CreateRoleUseCase.ts";
import { DeleteRoleUseCase } from "../modules/role/usecases/DeleteRoleUseCase.ts";
import { FindRoleByIdUseCase } from "../modules/role/usecases/FindRoleByIdUseCase.ts";
import { GetRolesUseCase } from "../modules/role/usecases/GetRolesUseCase.ts";
import { UpdateRoleUseCase } from "../modules/role/usecases/UpdateRoleUseCase.ts";

export class RoleController {

    private readonly repository = new PrismaRoleRepository();
    private readonly createRole = new CreateRoleUseCase(this.repository);
    private readonly deleteRole = new DeleteRoleUseCase(this.repository);
    private readonly getRoleById = new FindRoleByIdUseCase(this.repository);
    private readonly getRoles = new GetRolesUseCase(this.repository);
    private readonly updateRoles = new UpdateRoleUseCase(this.repository);

    create = async(req: Request, res: Response) => {

        try {

            const role = await this.createRole.execute(req.body);

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

    getAll = async (req: Request, res: Response) => {

        try {

            const roles = await this.getRoles.execute();

            return res.status(200).json(roles);

        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            console.error(error)
            return res.status(500).json({
                message: "Internal server error."
            });

        }

    }


    delete = async (req: Request, res: Response) => {

        try {

            await this.deleteRole.execute(
                Number(req.params.id)
            );

            return res.status(200).send({ message: "Role deleted"});

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

            const role = await this.getRoleById.execute(
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

    update = async (req: Request, res: Response) => {

        try {

            const role = await this.updateRoles.execute(
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