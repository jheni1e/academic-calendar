import { Request, Response } from "express";
import { ScheduleLessonsDTO } from "../dtos/SchedulerDto.ts";
import { scheduleLessonSeries } from "../services/scheduler.service.ts";
import { AppError } from "../shared/errors/AppError.ts";

export class SchedulerController {
    static async createLessonSeries(req: Request, res: Response) {
        const data: ScheduleLessonsDTO = req.body;

        try {
            const schedule = await scheduleLessonSeries(data);

            return res.status(201).json(schedule);
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