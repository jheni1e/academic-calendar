import { AuthService } from "../../../shared/services/auth.service.ts";
import { Request, Response } from "express";
import { authDTO } from "../authDTO.ts";

export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    async login(req: Request, res: Response) {
        const data : authDTO = req.body;
        
        const token = await this.authService.login(
            data.edv,
            data.password
        );

        return res.status(200).send({
            token
        });

    }

}