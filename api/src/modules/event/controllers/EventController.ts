import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaEventRepository } from "../repositories/PrismaEventRepository.ts";
import { CreateEventUseCase } from "../usecases/CreateEventUseCase.ts";
import { DeleteEventUseCase } from "../usecases/DeleteEventUseCase.ts";
import { FindEventByIdUseCase } from "../usecases/FindEventByIdUseCase.ts";
import { GetEventsUseCase } from "../usecases/GetEventsUseCase.ts";
import { UpdateEventUseCase } from "../usecases/UpdateEventUseCase.ts";
import { PrismaClassRepository } from "../../class/repositories/PrismaClassRepository.ts";
import { PrismaSubjectRepository } from "../../subject/repositories/PrismaSubjectRepository.ts";
import { PrismaReservationRepository } from "../../reservation/repositories/PrismaReservationRepository.ts";

export class EventController {

    private readonly repository = new PrismaEventRepository();
    private readonly classRepository = new PrismaClassRepository();
    private readonly subjectRepository = new PrismaSubjectRepository();
    private readonly reservationRepository = new PrismaReservationRepository();

    private readonly createUseCase = new CreateEventUseCase(this.repository, this.classRepository, this.subjectRepository);
    private readonly deleteUseCase = new DeleteEventUseCase(this.repository, this.reservationRepository);
    private readonly findUseCase = new FindEventByIdUseCase(this.repository);
    private readonly getEventsUseCase = new GetEventsUseCase(this.repository);
    private readonly updateUseCase = new UpdateEventUseCase(this.repository, this.reservationRepository);

    async handleCreate(req: Request, res: Response) {

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

    async handleGetEvents(req: Request, res: Response) {

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

    async handleUpdate(req: Request, res: Response) {

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