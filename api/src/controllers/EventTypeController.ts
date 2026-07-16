import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventTypeRepository } from "../repositories/PrismaEventTypeRepository.ts";
import { CreateEventTypeUseCase } from "../usecases/CreateEventTypeUseCase.ts";
import { DeleteEventTypeUseCase } from "../usecases/DeleteEventTypeUseCase.ts";
import { FindEventTypeByIdUseCase } from "../usecases/FindEventTypeByIdUseCase.ts";
import { GetEventTypesUseCase } from "../usecases/GetEventTypesUseCase.ts";
import { UpdateEventTypeUseCase } from "../usecases/UpdateEventTypeUseCase.ts";

export class CreateEventTypeController {

    private readonly repository = new PrismaEventTypeRepository();

    private readonly createUseCase = new CreateEventTypeUseCase(this.repository);
    private readonly deleteUseCase = new DeleteEventTypeUseCase(this.repository);
    private readonly findUseCase = new FindEventTypeByIdUseCase(this.repository);
    private readonly getEventTypeUseCase = new GetEventTypesUseCase(this.repository);
    private readonly updateUseCase = new UpdateEventTypeUseCase(this.repository);

    async handleCreate(req: Request, res: Response) {

        try {

            const eventType = await this.createUseCase.execute(req.body);

            return res.status(201).json(eventType);

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

            const eventType = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(eventType);

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

    async handleGetEventType(req: Request, res: Response) {

        try {

            const eventTypes = await this.getEventTypeUseCase.execute();

            return res.status(200).json(eventTypes);

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

            const eventType = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(eventType);

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