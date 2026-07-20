import { Request, Response } from "express";
import { login } from "../services/auth.service.ts";
import { authDTO } from "../dtos/authDTO.ts";

export class AuthController {
    static async login(req: Request, res: Response) {
        const data : authDTO = req.body;
        
        try {
            const token = await login(
                data.edv,
                data.password
            );

            return res.status(200).send({ message: `Welcome!`, token});
        } catch (error) {
            console.log(error)
            if (error instanceof Error)
                return res.status(401).send({ message : error.message})

            return res.status(500).send({ message: "Internal server error"})
        }
    }
}