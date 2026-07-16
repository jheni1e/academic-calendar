import { UpdateClassDTO } from "../../../dtos/ClassDto.ts";
import { IClassRepository } from "../repositories/IClassRepository.ts";

export class ActivateClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(classId: number) {

        const classItem = await this.classRepository.findById(classId);

        if (!classItem) {
            throw new Error("Class not found.");
        }

        if (classItem.is_active) {
            throw new Error("Class already active.");
        }

        const data: UpdateClassDTO = {
            isActive: true
        };

        return await this.classRepository.update(classId, data);
    }
}