import { Request, Response } from "express";

import { AppError } from "../shared/errors/AppError.ts";
import { CreateRoleDTO, UpdateRoleDTO } from "../dtos/RoleDTO.ts";
import { createRole, deleteRole, findAllRoles, findRoleById, findRoleByName, updateRole } from "../services/role.service.ts";

export class RoleController {
    static async create(req: Request, res: Response) {
        const data: CreateRoleDTO = req.body;
        try {
            const role = await createRole(data);

            return res.status(201).json(role);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findAllRoles(req: Request, res: Response) {
        try {
            const roles = await findAllRoles();

            return res.status(200).json(roles);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }


    static async deleteRole(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            await deleteRole(id);

            return res.status(200).send({ message: "Role deleted successfully." });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findRoleById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const role = await findRoleById(id);

            return res.status(200).json(role);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async findRoleByName(req: Request, res: Response) {
        const roleName: string = req.body;

        try {
            const role = await findRoleByName(roleName);

            return res.status(200).json(role);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    static async update(req: Request, res: Response) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateRoleDTO = req.body;

        try {
            const role = await updateRole(id, data);

            return res.status(200).json(role);
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