import { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma/client.ts";

export function authorize(...roles: string[]) {
    return(req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;

        if(!user){
            return res.status(200).send("User not authenticated")
        }

        const hasPermission = user.roles.some((role: Role) =>
            roles.includes(role.name)
        );

        if(!hasPermission) {
            return res.status(403).send("Access denied")
        }

        next();
    }

}