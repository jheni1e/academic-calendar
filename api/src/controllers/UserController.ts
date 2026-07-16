import { Request, Response } from "express";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDto.ts";
import { PrismaUserRepository } from "../modules/user/repositories/PrismaUserRepository.ts";
import { CreateUserUseCase } from "../modules/user/usecases/CreateUserUseCase.ts";
import { FindUserByIdUseCase } from "../modules/user/usecases/FindUserByIdUseCase.ts";
import { FindAllUsersUseCase } from "../modules/user/usecases/FindAllUseCase.ts";
import { UpdateUserUseCase } from "../modules/user/usecases/UpdateUserUseCase.ts";
import { FindUserByEdvUseCase } from "../modules/user/usecases/FindUserByEdvUseCase.ts";
import { DisableUserUseCase } from "../modules/user/usecases/DisableUserUseCase.ts";
import { PrismaAssignmentRepository } from "../modules/assignment/repositories/PrismaAssignmentRepository.ts";
import { PrismaRoleRepository } from "../modules/role/repositories/PrismaRoleRepository.ts";

export class UserController {
    private readonly userRepository = new PrismaUserRepository();
    private readonly assignmentRepository = new PrismaAssignmentRepository();
    private readonly roleRepository = new PrismaRoleRepository();

    private readonly createUser = new CreateUserUseCase(this.userRepository, this.assignmentRepository, this.roleRepository);
    private readonly findUserById = new FindUserByIdUseCase(this.userRepository);
    private readonly findUserByEdv = new FindUserByEdvUseCase(this.userRepository);
    private readonly findAllUsers = new FindAllUsersUseCase(this.userRepository);
    private readonly updateUser = new UpdateUserUseCase(this.userRepository, this.roleRepository, this.assignmentRepository,);
    private readonly disableUser = new DisableUserUseCase(this.userRepository);

    create = async(req: Request, res: Response) => {
        
        const data : CreateUserDTO = req.body

        try {
            const user = await this.createUser.execute(data);
            return res.status(200).send({ message : "User created!" })

        } catch (error) {
            if (error instanceof Error)
                return res.status(401).send({ message : error.message })

            return res.status(500).send({ message : "Internal server error"})
        }
    }

    getAll = async(req: Request, res: Response) => {
        try {
            const users = await this.findAllUsers.execute();
            return res.status(200).send({ users })

        } catch (error) {

            if (error instanceof Error)
                return res.status(401).send({ message : error.message})

            return res.status(500).send({ message: "Internal server error"})
        }
    }

    getById = async(req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const user = await this.findUserById.execute(Number(id));
            // console.log(user)
            // console.log(res.locals.user.role)
            // console.log(Array.isArray(res.locals.user.role));
            // console.log(typeof res.locals.user.role);
            // console.log(JSON.stringify(res.locals.user.role, null, 2));
            return res.status(200).send(user)

        } catch (error) {
            if (error instanceof Error)
                return res.status(401).send({ message: error.message})

            return res.status(500).send({ message: "Internal server error"})
        }
    }

    getByEdv = async(req: Request, res: Response) => {
        const { edv } = req.params;

        try {
            const user = await this.findUserByEdv.execute(Number(edv))
            return res.status(200).send(user)
        } catch (error) {
            if (error instanceof Error) 
                return res.status(401).send({ message: error.message })

            return res.status(500).send({ message: "Internal server error" })
        }
    }

    update = async(req: Request, res: Response) => {
        const { id } = req.params
        const data : UpdateUserDTO = req.body

        try {
            const user = await this.updateUser.execute(Number(id), data)
            
            if(res.locals.user.edv == user.user_edv)
                return res.status(200).send({ message: "User succesfully updated!", user})
            return res.status(401).send({ message : "Access denied"})

        } catch(error) {
            if (error instanceof Error)
                return res.status(401).send({ message : error.message})

            return res.status(500).send({ message: "Internal server error" })
        }}
    

    disable = async(req: Request, res: Response) => {
        const { id } = req.params

        try {
            const user = await this.disableUser.execute(Number(id))
            return res.status(200).send({ message: "User disabled"})

        } catch (error) {
            if (error instanceof Error)
                return res.status(401).send({ message: error.message})
            return res.status(500).send({ message: "Internal server error"})
        }
    }

}