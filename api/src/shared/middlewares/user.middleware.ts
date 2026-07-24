import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { ConflictError } from "../errors/ConflictError.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";
import { UserRole } from "../../generated/prisma/enums.ts";
import { findUserByEdv, findUserById, updateUser } from "../../services/user.service.ts";
import { UnauthorizedError } from "../errors/UnauthorizedError.ts";

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { edv, name, birthdate, password, role } = req.body;

        const date = new Date(birthdate);

        if (isNaN(date.getTime())) {
            throw new BadRequestError("Invalid birthdate.");
        }

        if (date > new Date()) {
            throw new BadRequestError("Birthdate cannot be in the future.");
        }
        
        if (!name || !edv || !password || !role) {
            throw new BadRequestError("Missing required fields.");
        }

        const exists = await findUserByEdv(Number(edv))
 
        if (exists) {
            throw new ConflictError("User already has an account");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateDisable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const edv: number = parseInt(req.params.id.toString());

        const exists = await findUserByEdv(edv)

        if (!exists) {
            throw new NotFoundError("User not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateActivate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const edv: number = parseInt(req.params.id.toString());

        const exists = await findUserByEdv(edv)

        if (!exists) {
            throw new NotFoundError("User not found.");
        }

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = parseInt(req.params.id.toString());

        if (Number.isNaN(userId)) {
            throw new BadRequestError("User Id is invalid.");
        }

        const user = await prisma.user.findUnique({
            where: {
                user_id: userId
            }
        });

        if (!user) 
            throw new NotFoundError("User not found");

        if(res.locals.user.id != userId) 
            throw new UnauthorizedError("Access denied")
        

        next();
    } catch (error) {
        next(error);
    }
}

export const validateUserExistsByEdv = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { edv } = req.params

        const user = await findUserByEdv(Number(edv))

        if (!user) {
            throw new NotFoundError("User not found.");
        }

        res.locals.foundUser = user

        next();
    } catch (err) {
        next(err);
    }
}

export const validateUserExistsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const user = await findUserById(Number(id))

        if (!user) {
            throw new NotFoundError("User not found.");
        }

        res.locals.foundUser = user

        next();
    } catch (err) {
        next(err);
    }
}

