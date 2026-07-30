import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../app/utils/jwt.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";

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

export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { edv, password } = req.body

    if(!req.body || Object.keys(req.body).length === 0)
        throw new BadRequestError("Request body is required")

    if(!edv) 
        throw new BadRequestError("EDV is required")

    if(!password)
        throw new BadRequestError("Password is required")

    next()

}