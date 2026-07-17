import { Request, Response } from "express";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDto.ts";
import { createUser, disableUser, findAllUsers, findUserByEdv, findUserById, updateUser } from "../services/user.service.ts";

export class UserController {
    static async create(req: Request, res: Response) {
        
        const data : CreateUserDTO = req.body

        try {
            const user = await createUser(data);
            return res.status(200).send({ message : "User created!" })

        } catch (error) {
            if (error instanceof Error)
                return res.status(401).send({ message : error.message })

            return res.status(500).send({ message : "Internal server error"})
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const users = await findAllUsers();
            return res.status(200).send({ users })

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

    static async getByEdv(req: Request, res: Response) {
        const { edv } = req.params;

        try {
            const user = await findUserByEdv(Number(edv))
            return res.status(200).send(user)
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
            const user = await updateUser(Number(id), data)
            
            if(res.locals.user.edv == user.user_edv)
                return res.status(200).send({ message: "User succesfully updated!", user})
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