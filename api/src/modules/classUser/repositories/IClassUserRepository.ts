import { ClassUser } from "../../../generated/prisma/client.ts";
import { CreateClassUserDTO } from "../../../dtos/ClassUserDTO.ts";

export interface IClassUserRepository {

    create(
        data: CreateClassUserDTO
    ): Promise<ClassUser>;

    findById(
        classUserId: number
    ): Promise<ClassUser | null>;

    findByUser(
        userId: number
    ): Promise<ClassUser[]>;

    findByClass(
        classId: number
    ): Promise<ClassUser[]>;

    findByClassAndUser(
        classId: number,
        userId: number
    ): Promise<ClassUser | null>;

    findAll(): Promise<ClassUser[]>;

    delete(
        classUserId: number
    ): Promise<void>;
}