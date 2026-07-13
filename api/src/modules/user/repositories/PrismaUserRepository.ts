import { User } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { CreateUserDTO, UpdateUserDTO } from "../UserDto.ts";
import { IUserRepository } from "./IUserRepository.ts";

export class PrismaUserRepository implements IUserRepository {

    async create(
        data: CreateUserDTO
    ): Promise<User> {

        return await prisma.user.create({
            data: {
                user_edv: data.edv,
                name: data.name,
                birthday: data.birthdate,
                is_active: true,
                password : data.password
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

    async findByName(
        name: string
    ): Promise<User | null> {

        return await prisma.user.findFirst({
            where: {
                name: name
            }
        });
    }

    async findById(
        userId: number
    ): Promise<User | null> {

        return await prisma.user.findUnique({
            where: {
                user_id: userId
            }
        });
    }

    async findAll(): Promise<User[]> {

        return await prisma.user.findMany();
    }

    async update(
        userId: number,
        data: UpdateUserDTO
    ): Promise<User> {
    
        return await prisma.user.update({
            where: {
                user_id: userId
            },
            data: {
                name: data.name,
                birthday: data.birthdate
            }
        });
    }

    async disable(
        id: number
    ): Promise<User> {

        return await prisma.user.update({
            where: {
                user_id: id
            },
            data: {
                is_active: false
            }
        });
    }
}