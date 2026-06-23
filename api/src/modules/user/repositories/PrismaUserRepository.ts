import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../dto/UserDto";
import { IUserRepository } from "./IUserRepository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {

    async create(
        data: CreateUserDTO
    ): Promise<User> {

        return await prisma.user.create({
            data: {
                user_edv: data.userEdv,
                name: data.name,
                birthdate: data.birthdate,
                is_active: true
            }
        });
    }

    async findByEdv(
        userEdv: number
    ): Promise<User | null> {

        return await prisma.user.findUnique({
            where: {
                user_edv: userEdv
            }
        });
    }

    async findAll(): Promise<User[]> {

        return await prisma.user.findMany();
    }

    async update(
        userEdv: number,
        data: UpdateUserDTO
    ): Promise<User> {

        return await prisma.user.update({
            where: {
                user_edv: userEdv
            },
            data: {
                name: data.name,
                birthdate: data.birthdate,
                is_active: data.isActive
            }
        });
    }

    async disable(
        userEdv: number
    ): Promise<User> {

        return await prisma.user.update({
            where: {
                user_edv: userEdv
            },
            data: {
                is_active: false
            }
        });
    }
}