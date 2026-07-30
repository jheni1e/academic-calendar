import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../app/utils/jwt.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";
import { findUserByEdv, findUserById } from "../../services/user.service.ts";
import { UnauthorizedError } from "../errors/UnauthorizedError.ts";

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ message: "Token not provided" })
    }

    const [, token] = authHeader.split(" ");

    try {
        const payload = verifyToken(token);
        res.locals.user = payload;
        next();

    } catch {
        return res.status(401).send({ message : "Invalid Token"})
    }
}

export async function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { edv, password } = req.body

    if(!req.body || Object.keys(req.body).length === 0)
        throw new BadRequestError("Request body is required")

    if(!edv) 
        throw new BadRequestError("EDV is required")

    if(!password)
        throw new BadRequestError("Password is required")

    const user = await findUserByEdv(Number(edv))

    if(!user)
        throw new BadRequestError("Invalid user or password")

    if(!user.isActive)
        throw new UnauthorizedError("This user is inactive. Please contact your administrator if you believe this is an error.")

    next()

}