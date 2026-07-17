import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";

export const validateActivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.id.toString());

        const subject = await prisma.subject.findFirst({
            where: { id: subjectId },
        });

        if (!subject) {
            throw new Error("Subject not found.");
        }

        if (subject.is_active) {
            throw new Error("Subject already active.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { classId, name, workload, startDate, endDate } = req.body;

        if (!name.trim()) {
            throw new Error("Subject name is mandatory.");
        }

        if (workload !== undefined && workload <= 0) {
            throw new Error("Workload must be greater than zero.");
        }

        if (workload % 4 !== 0) {
            throw new Error("Workload must be a multiple of four.");
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            throw new Error("Start date must be scheduled before finish date.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDectivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.id.toString());

        const subject = await prisma.subject.findFirst({
            where: { id: subjectId },
        });

        if (!subject) {
            throw new Error("Subject not found.");
        }

        if (!subject.is_active) {
            throw new Error("Subject already deactivated.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.id.toString());

        const subject = await prisma.subject.findFirst({
            where: { id: subjectId },
        });

        if (!subject) {
            throw new Error("Subject not found.");
        }

        if (subject.is_active) {
            throw new Error("Active subjects can't be deleted.");
        }

        // TODO: Need User Type Verification before delete!

        const events = await prisma.events.findMany({
            where: { subjectId: subjectId },
        });

        if (events.length > 0) {
            throw new Error("There are events linked to this subject.");
        }

        const subjectInstructors = await prisma.subjectinstructor.findMany({
            where: { subjectId: subjectId },
        });

        if (subjectInstructors.length > 0) {
            throw new Error("There are instructors linked to this subject.");
        }

       const subjectRooms = await prisma.subjectroom.findMany({
            where: { subjectId: subjectId },
        });

        if (subjectRooms.length > 0) {
            throw new Error("There are rooms linked to this subject.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.id.toString());
        const { classId, name, workload, startDate, endDate, isActive } = req.body;

        const subject = await prisma.subject.findFirst({
            where: { id: subjectId },
        });

        if (!subject) {
            throw new Error("Subject not found.");
        }

        if (name !== undefined && !name.trim()) {
            throw new Error("Subject name is mandatory.");
        }

        if (workload !== undefined && workload <= 0) {
            throw new Error("Workload must be greater than zero.");
        }

        const start = new Date(startDate ?? subject.start_date);
        const end = new Date(endDate ?? subject.end_date);

        if (start >= end) {
            throw new Error("Start date must be scheduled before finish date.");
        }

        next();
    } catch (error) {
        next(error);
    }
}