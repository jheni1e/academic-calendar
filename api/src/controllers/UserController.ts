import { Request, Response } from "express";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDto.ts";
import { createUser, disableUser, findAllUsers, findUserByEdv, findUserById, updateUser } from "../services/user.service.ts";
import { hashPassword } from "../app/utils/password.ts";
import { UserRole } from "../generated/prisma/enums.ts";

export class UserController {
    static async create(req: Request, res: Response) {
        
        const data : CreateUserDTO = req.body

        try {
            const password = await hashPassword(data.password);
        
            const user = await createUser({
                ...data,
                password
            });

            return res.status(200).send({ message : "User created!", user })

        } catch (error) {
            if (error instanceof Error)
                return res.status(401).send({ message : error.message })

            return res.status(500).send({ message : "Internal server error"})
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const users = await findAllUsers();

        return res.status(200).send(users);


        } catch (error) {

            if (error instanceof Error)
                return res.status(401).send({ message : error.message})

            return res.status(500).send({ message: "Internal server error"})
        }
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await findUserById(Number(id));
            return res.status(200).send(user)

        } catch (error) {
            if (error instanceof Error)
                return res.status(401).send({ message: error.message})

            return res.status(500).send({ message: "Internal server error"})
        }
    }

    static async getByEdv(req: Request, res: Response) {
        const { edv } = req.params;

        try {
            const user = await findUserByEdv(Number(edv))
            if(!user)
                return res.status(404).send({ message: "User not found"})
            return res.status(200).send({user})
        } catch (error) {
            if (error instanceof Error) 
                return res.status(401).send({ message: error.message })

            return res.status(500).send({ message: "Internal server error" })
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const data : UpdateUserDTO = req.body

        try {
            if(data.role) {
                if(!Object.values(UserRole).includes(data.role as UserRole))
                    return res.status(400).send({ message: "Invalid role" });
            }
            
            const user = await findUserById(Number(id))

            if(!user)
                return res.status(404).send({ message: "User not found"})

            if(res.locals.user.edv == user.edv) {
                const newUser = await updateUser(Number(id), data)
                return res.status(200).send({ message: "User succesfully updated!", newUser})
            }
            return res.status(401).send({ message : "Access denied"})

        } catch(error) {
            if (error instanceof Error)
                return res.status(401).send({ message : error.message})


            return res.status(500).send({ message: "Internal server error" })
        }}
    

    static async disable(req: Request, res: Response) {
        const { id } = req.params

        try {
            const user = await disableUser(Number(id))
            return res.status(200).send({ message: "User disabled"})

        } catch (error) {
            if (error instanceof Error)
                return res.status(401).send({ message: error.message})
            return res.status(500).send({ message: "Internal server error"})
        }
    }

}