import { CreateClassUserDto } from "../ClassUserDto.ts";

export interface IClassUserRepository {
    
    create(
        data: CreateClassUserDto
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

    findAll(): Promise<ClassUser[]>;

    exists(
        classId: number,
        userId: number
    ): Promise<boolean>;

    delete(
        classUserId: number
    ): Promise<void>;
}