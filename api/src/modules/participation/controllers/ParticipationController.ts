import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaParticipationRepository } from "../repositories/PrismaParticipationRepository.ts";
import { CreateParticipationUseCase } from "../usecases/CreateParticipationUseCase.ts";
import { DeleteParticipationUseCase } from "../usecases/DeleteParticipationUseCase.ts";
import { FindParticipationByIdUseCase } from "../usecases/FindParticipationByIdUseCase.ts";
import { GetParticipationsByEventUseCase } from "../usecases/GetParticipationsByEventUseCase.ts";
import { GetParticipationsByUserUseCase } from "../usecases/GetParticipationsByUserUseCase.ts";
import { GetParticipationsUseCase } from "../usecases/GetParticipationsUseCase.ts";
import { UpdateParticipationUseCase } from "../usecases/UpdateParticipationUseCase.ts";

export class ParticipationController {

    private readonly repository = new PrismaParticipationRepository();

    private readonly createUseCase = new CreateParticipationUseCase(this.repository);
    private readonly deleteUseCase = new DeleteParticipationUseCase(this.repository);
    private readonly findUseCase = new FindParticipationByIdUseCase(this.repository);
    private readonly getUseCase = new GetParticipationsUseCase(this.repository);
    private readonly getByEventUseCase = new GetParticipationsByEventUseCase(this.repository);
    private readonly getByUserUseCase = new GetParticipationsByUserUseCase(this.repository);
    private readonly updateUseCase = new UpdateParticipationUseCase(this.repository);

    create = async (req: Request, res: Response) => {

        try {

            const participation = await this.createUseCase.execute(req.body);

            return res.status(201).json(participation);

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

            const participation = await this.findUseCase.execute(
                Number(req.params.id)
            );

            return res.status(200).json(participation);

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

            const participations = await this.getUseCase.execute();

            return res.status(200).json(participations);

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

    getByEvent = async (req: Request, res: Response) => {

        try {

            const participations = await this.getByEventUseCase.execute(
                Number(req.params.eventId)
            );

            return res.status(200).json(participations);

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

            const participations = await this.getByUserUseCase.execute(
                Number(req.params.userId)
            );

            return res.status(200).json(participations);

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

            const participation = await this.updateUseCase.execute(
                Number(req.params.id),
                req.body
            );

            return res.status(200).json(participation);

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