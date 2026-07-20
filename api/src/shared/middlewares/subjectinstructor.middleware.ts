import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId, instructorId } = req.body;

        const subject = await prisma.subject.findFirst({
            where: { id: subjectId },
        });

        if (!subject) {
            throw new Error("Subject not found.");
        }

        const user = await prisma.user.findFirst({
            where: { id: instructorId },
        });

        if (!user) {
            throw new Error("Instructor not found.");
        }

        const relation = await prisma.subjectinstructor.findFirst({
            where: { subjectId: subjectId, instructorId: instructorId },
        });

        if (!relation) {
            throw new Error("Instructor already connected to the subject.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId, instructorId } = req.body;

        const relation = await prisma.subjectinstructor.findFirst({
            where: { subjectId: subjectId, instructorId: instructorId },
        });

        if (!relation) {
            throw new Error("Instructor is not connected to the subject.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
