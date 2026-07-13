import { UpdateClassDTO } from "../ClassDTO.ts";
import { IClassRepository } from "../repositories/IClassRepository.ts";

export class ActivateClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(classId: number) {

        const classItem = await this.classRepository.findById(classId);

        if (!classItem) {
            throw new Error("Turma não encontrada.");
        }

        if (classItem.is_active) {
            throw new Error("A turma já está ativa.");
        }

        const data: UpdateClassDTO = {
            isActive: true
        };

        return await this.classRepository.update(classId, data);
    }
}