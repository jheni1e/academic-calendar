import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository.ts";
import { CreateRoleDTO } from "../RoleDTO.ts";

export class RoleControl {
    private readonly roleRepository = new PrismaRoleRepository();
    private readonly createRole = 

    create = async(req: Request, res: Response) => {
        const data : CreateRoleDTO = req.body

        try {
            const role = await this.createRole.execute()
        }
    }
}