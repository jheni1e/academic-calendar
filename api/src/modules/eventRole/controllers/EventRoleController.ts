import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRoleRepository } from "../repositories/PrismaEventRoleRepository.ts";
import { CreateEventRoleUseCase } from "../usecases/CreateEventRoleUseCase.ts";
import { DeleteEventRoleUseCase } from "../usecases/DeleteEventRoleUseCase.ts";
import { FindEventRoleByIdUseCase } from "../usecases/FindEventRoleByIdUseCase.ts";
import { GetEventRolesUseCase } from "../usecases/GetEventRolesUseCase.ts";
import { UpdateEventRoleUseCase } from "../usecases/UpdateEventRoleUseCase.ts";

export class EventRoleController {

    private readonly repository = new PrismaEventRoleRepository();

    private readonly createUseCase = new CreateEventRoleUseCase(this.repository);
    private readonly deleteUseCase = new DeleteEventRoleUseCase(this.repository);
    private readonly findUseCase = new FindEventRoleByIdUseCase(this.repository);
    private readonly getUseCase = new GetEventRolesUseCase(this.repository);
    private readonly updateUseCase = new UpdateEventRoleUseCase(this.repository);

    async handleCreate(req: Request, res: Response) {

        try {

            const eventRole = await this.createUseCase.execute(req.body);

            return res.status(201).json(eventRole);

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

            const eventRole = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(eventRole);

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

            const eventRoles = await this.getUseCase.execute();

            return res.status(200).json(eventRoles);

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

            const eventRole = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(eventRole);

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