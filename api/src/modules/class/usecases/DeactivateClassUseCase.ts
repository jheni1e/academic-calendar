import { IClassRepository } from "../repositories/IClassRepository.ts";
import { UpdateClassDTO } from "../../../dtos/ClassDto.ts";

export class DeactivateClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(classId: number) {

        const classItem = await this.classRepository.findById(classId);

        if (!classItem) {
            throw new Error("Class not found.");
        }

        if (!classItem.is_active) {
            throw new Error("Class already inactive.");
        }

        const data: UpdateClassDTO = {
            isActive: false
        };

        return await this.classRepository.update(classId, data);
    }
}