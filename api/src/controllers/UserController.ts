import { NextFunction, Request, Response } from "express";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDto.ts";
import { activateUser, createUser, disableUser, findAllUsers, findUserByEdv, findUserById, getInstructors, updateUser } from "../services/user.service.ts";
import { hashPassword } from "../app/utils/password.ts";
import { UserRole } from "../generated/prisma/enums.ts";

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        
        const data : CreateUserDTO = req.body

        try {
            const password = await hashPassword(data.password);
        
            const user = await createUser({
                ...data,
                password
            });

            return res.status(200).send({ message : "User created!", user })

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await findAllUsers();

        return res.status(200).send(users);


        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.foundUser
            return res.status(200).send(user)

        } catch (error) {
            next(error)
        }
    }

    static async getByEdv(req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.foundUser
            return res.status(200).send({user})

        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const data : UpdateUserDTO = req.body

        try {
            const newUser = await updateUser(Number(id), data)
            return res.status(200).send({ message: "User succesfully updated!", newUser})

        } catch(error) {
           next(error)
        }}
    

    static async disable(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        try {
            const user = await disableUser(Number(id))
            return res.status(200).send({ message: "User disabled"})

        } catch (error) {
            next(error)
        }
    }

    static async activate(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        try {
            await activateUser(Number(id))
            return res.status(200).send({ message: "User updated"})

        } catch (error) {
            next(error)
        }
    }

    static async getInstructors(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await getInstructors();
            return res.status(200).send(users)

        } catch(error) {
            next(error)
        }
    }

}