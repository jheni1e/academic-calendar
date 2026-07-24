import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError.ts";

export const validateCreateLessonSeries = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;

        if (!data.recurrence) {
            throw new BadRequestError("Recurrence is required.");
        }

        const recurrence = data.recurrence;

        if (!!recurrence.repeatUntil === !!recurrence.occurrences) {
            throw new BadRequestError(
                "Provide either repeatUntil or occurrences."
            );
        }

        if (
            !recurrence.monday &&
            !recurrence.tuesday &&
            !recurrence.wednesday &&
            !recurrence.thursday &&
            !recurrence.friday
        ) {
            throw new BadRequestError(
                "Select at least one weekday."
            );
        }

        if (data.startHour >= data.endHour) {
            throw new BadRequestError(
                "End hour must be after start hour."
            );
        }

        if (isNaN(new Date(data.startDate).getTime())) {
            throw new BadRequestError(
                "Invalid start date."
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};