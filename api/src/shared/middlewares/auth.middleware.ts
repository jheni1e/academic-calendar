import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../app/utils/jwt.ts";

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