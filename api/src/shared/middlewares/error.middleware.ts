import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.ts";

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        message: "Internal server error."
    });
}