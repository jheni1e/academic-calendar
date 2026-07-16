import { UpdateClassDTO } from "../../../dtos/ClassDTO.ts";
import { IClassRepository } from "../repositories/IClassRepository.ts";

export class UpdateClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(
        classId: number,
        data: UpdateClassDTO
    ) {

        const classItem = await this.classRepository.findById(classId);

        if (!classItem) {
            throw new Error("Class not found.");
        }

        // Caso o nome seja informado, ele não pode ser vazio
        if (data.name !== undefined && !data.name.trim()) {
            throw new Error("Class name is required.");
        }

        return await this.classRepository.update(
            classId,
            data
        );
    }
}