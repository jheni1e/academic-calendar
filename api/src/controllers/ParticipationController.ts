import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError.ts";
import { createParticipation, deleteParticipation, findAllParticipations, findParticipationByEvent, findParticipationById, findParticipationByUser, findParticipationByUserAndEvent, updateParticipation } from "../services/participation.service.ts";
import { CreateParticipationDTO, UpdateParticipationDTO } from "../dtos/ParticipationDto.ts";

export class ParticipationController {
    static async create(req: Request, res: Response, next: NextFunction) {
        const data: CreateParticipationDTO = req.body;
        try {
            const participation = await createParticipation(data);

            return res.status(201).json(participation);
        } catch (error) {
           next(error)
    }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id.toString());

        try {
            await deleteParticipation(id);

            return res.status(204).send({ message: "Participation deleted successfully." });
        } catch (error) {
            next(error);
        }
    }

    static async findParticipationById(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const participation = await findParticipationById(id);

            return res.status(200).json(participation);
        } catch (error) {
            next(error);
        }
    }

    static async findAllParticipations(req: Request, res: Response, next: NextFunction) {
        try {
            const participations = await findAllParticipations();

            return res.status(200).json(participations);
        } catch (error) {
            next(error);
        }
    }

    static async findParticipationByEvent(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const participations = await findParticipationByEvent(id);

            return res.status(200).json(participations);
        } catch (error) {
            next(error);
        }
    }

    static async findParticipationByUser(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id.toString());

        try {
            const participations = await findParticipationByUser(id);

            return res.status(200).json(participations);
        } catch (error) {
            next(error);
        }
    }

    static async findParticipationByUserAndEvent(req: Request, res: Response, next: NextFunction) {
        const userId: number = parseInt(req.params.id[0].toString());
        const eventId: number = parseInt(req.params.id[1].toString());

        try {
            const participations = await findParticipationByUserAndEvent(userId, eventId);

            return res.status(200).json(participations);
        } catch (error) {
            next(error);
        }
    }

    static async updateParticipation(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id.toString());
        const data: UpdateParticipationDTO = req.body;

        try {
            const participation = await updateParticipation(id, data);

            return res.status(200).json(participation);
        } catch (error) {
            next(error);
        }

    }
}