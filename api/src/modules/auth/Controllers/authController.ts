import { AuthService } from "../../../shared/services/auth.service.ts";
import { Request, Response } from "express";
import { authDTO } from "../authDTO.ts";

export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    login = async(req: Request, res: Response) => {
        const data : authDTO = req.body;
        
        try {
            const token = await this.authService.login(
                data.edv,
                data.password
            );

            return res.status(200).send({ message: `Welcome!`, token});
            
        } catch (error) {
            
            if (error instanceof Error)
                return res.status(401).send({ message : error.message})

            return res.status(500).send({ message: "Internal server error"})
        }


    }

}