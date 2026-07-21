import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { ForbiddenError } from "../errors/ForbiddenError.ts";
import { findClassById } from "../../services/class.service.ts";
import { findSubjectById } from "../../services/subject.service.ts";
import { findSubjectInstructorBySubjectAndInstructor } from "../../services/subjectinstructor.service.ts";
import { findUserById } from "../../services/user.service.ts";
import { findEventById } from "../../services/event.service.ts";
import { findReservationByEvent } from "../../services/reservation.service.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, eventTypeId, subjectId, instructorId, classId, recurrence, createdBy, startDate, endDate } = req.body;

        if (!title?.trim()) {
            throw new Error("Event title is required.");
        }

        if (!eventTypeId) {
            throw new Error("Event type is required.");
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Invalid dates.");
        }
        
        if (start >= end) {
            throw new Error("Start date must be before end date.");
        }

        if (classId) {
            const classItem = await findClassById(classId)

            if (!classItem) {
                throw new Error("Class not found.");
            }
        }

        if (subjectId) {
            const subject = await findSubjectById(subjectId)

            if (!subject) {
                throw new NotFoundError("Subject not found.");
            }

            const subjectInstructor = await findSubjectInstructorBySubjectAndInstructor(subjectId, instructorId)

            if (!subjectInstructor) {
                throw new Error("The instructor is not linked to the subject.");
            }
        }

        if (createdBy) {
            const creator = await findUserById(createdBy)

            if (!creator) {
                throw new NotFoundError("Creator doesn't exists.");
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId: number = parseInt(req.params.id[0].toString());

        const event = await findEventById(eventId)

        if (!event) {
            throw new NotFoundError("Event not found");
        }

        const reservation = await findReservationByEvent(eventId)

        if (reservation) {
            throw new ForbiddenError("Cannot delete an event with a reservation.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, eventTypeId, subjectId, classId, recurrence, createdBy } = req.body;
        const eventId: number = parseInt(req.params.id.toString());

        const event = await findEventById(eventId)

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        if (title !== undefined && !title.trim()) {
            throw new Error("Event title is required.");
        }

        if (event.is_blocked) {
            throw new ForbiddenError("Cannot update a blocked event.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateEventExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId: number = parseInt(req.params.id[0].toString());

        const event = await findEventById(eventId)

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
