import { Request, Response, NextFunction } from "express";

export function authorize(...roles: string[]) {
    return(req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;

        if(!user){
            return res.status(200).send("User not authenticated")
        }

        if(!roles.includes(user.role)) {
            return res.status(403).send("Access denied")
        }

        next();
    }

}