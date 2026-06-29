import { Class } from "../../../generated/prisma/client.ts";
import { CreateClassDTO, UpdateClassDTO } from "../ClassDto.ts";

export interface IClassRepository {

    create(data: CreateClassDTO) : Promise<Class>;

    findById(classId: number) : Promise<Class>;

    findAll() : Promise<Class>;

    update(
        classId: number,
        data: UpdateClassDTO
    ) : Promise<Class>;

    delete(classId: number) : Promise<Class>;
}