import { Request, Response } from "express";
import { authDTO } from "../dtos/AuthDTO.ts";
import { login } from "../services/auth.service.ts";

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