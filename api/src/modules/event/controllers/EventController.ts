import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRepository } from "../repositories/PrismaEventRepository.ts";
import { CreateEventUseCase } from "../usecases/CreateEventUseCase.ts";
import { DeleteEventUseCase } from "../usecases/DeleteEventUseCase.ts";
import { FindEventByIdUseCase } from "../usecases/FindEventByIdUseCase.ts";
import { GetEventsUseCase } from "../usecases/GetEventsUseCase.ts";
import { UpdateEventUseCase } from "../usecases/UpdateEventUseCase.ts";

export class EventController {

    private readonly repository = new PrismaEventRepository();

    private readonly createUseCase = new CreateEventUseCase(this.repository);
    private readonly deleteUseCase = new DeleteEventUseCase(this.repository);
    private readonly findUseCase = new FindEventByIdUseCase(this.repository);
    private readonly getEventsUseCase = new GetEventsUseCase(this.repository);
    private readonly updateUseCase = new UpdateEventUseCase(this.repository);

    create = async (req: Request, res: Response) => {

        try {

            const event = await this.createUseCase.execute(req.body);

            return res.status(201).json(event);

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

    delete = async(req: Request, res: Response) => {

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

            const event = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(event);

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

            const events = await this.getEventsUseCase.execute();

            return res.status(200).json(events);

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

            const event = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(event);

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