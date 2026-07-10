import { IClassRepository } from "../repositories/IClassRepository.ts";
import { UpdateClassDTO } from "../ClassDto.ts";

export class DeactivateClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(classId: number) {

        const classItem = await this.classRepository.findById(classId);

        if (!classItem) {
            throw new Error("Turma não encontrada.");
        }

        if (!classItem.is_active) {
            throw new Error("A turma já está inativa.");
        }

        const data: UpdateClassDTO = {
            isActive: false
        };

        return await this.classRepository.update(classId, data);
    }
}