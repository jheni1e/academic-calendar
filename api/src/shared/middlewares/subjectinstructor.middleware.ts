import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { UserRole } from "../../generated/prisma/enums.ts";
import { findSubjectById } from "../../services/subject.service.ts";
import { findUserById } from "../../services/user.service.ts";
import { findSubjectInstructorBySubjectAndInstructor } from "../../services/subjectinstructor.service.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId, instructorId } = req.body;

        const subject = await findSubjectById(subjectId)

        if (!subject) {
            throw new Error("Subject not found.");
        }

        const user = await findUserById(instructorId)

        if (!user) {
            throw new Error("Instructor not found.");
        }

        if(user.role == "APPRENTICE") 
            throw new Error("User needs to be an instructor.")

        const relation = await findSubjectInstructorBySubjectAndInstructor(subjectId, instructorId)

        if (relation) {
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

        const relation = await findSubjectInstructorBySubjectAndInstructor(subjectId, instructorId)

        if (!relation) {
            throw new Error("Instructor is not connected to the subject.");
        }

        next();
    } catch (error) {
        next(error);
    }
}
