import { User } from "../../../generated/prisma/client.ts";
import { CreateUserDTO, UpdateUserDTO } from "../UserDto.ts";

export interface IUserRepository {
    create(data: CreateUserDTO): Promise<User>;

    findById(
        userId: number
    ): Promise<User | null>;

    findByEdv(
        userEdv: number
    ): Promise<User | null>;

    findByName(
        name: string
    ): Promise<User | null>;

    findAll(): Promise<User[]>;

    update(
        userEdv: number,
        data: UpdateUserDTO
    ): Promise<User>;

    disable(
        userEdv: number
    ): Promise<User>;
}