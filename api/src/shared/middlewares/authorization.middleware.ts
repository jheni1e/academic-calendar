import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../generated/prisma/client.ts";

export function authorize(...roles: string[]) {
    return(req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;

        if(!user){
            return res.status(200).send("User not authenticated")
        }

        const hasPermission = Object.values(UserRole).includes(user.role as UserRole)

        if(!hasPermission) {
            return res.status(403).send("Access denied")
        }

        next();
    }

}