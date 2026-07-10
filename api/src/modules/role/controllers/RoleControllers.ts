import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository.ts";
import { CreateRoleDTO } from "../RoleDTO.ts";
import { CreateRoleUseCase } from "../usecases/CreateRoleUseCase.ts";
import { Request, Response } from "express";

export class RoleController {
    private readonly roleRepository = new PrismaRoleRepository();
    private readonly createRole = new CreateRoleUseCase(this.roleRepository);
    
    create = async(req: Request, res: Response) => {
        const data : CreateRoleDTO = req.body

        try {
            const role = await this.createRole.execute(data)
            return res.status(201).send(role)
        } catch (error) {
            if (error instanceof Error)
                return res.status(400).send({ message: error.message })

            return res.status(500).send({ message: "Internal server error" })
        }
    }


}