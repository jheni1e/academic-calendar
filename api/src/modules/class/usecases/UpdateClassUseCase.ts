import { UpdateClassDTO } from "../ClassDto.ts";
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
            throw new Error("Turma não encontrada.");
        }

        // Caso o nome seja informado, ele não pode ser vazio
        if (data.name !== undefined && !data.name.trim()) {
            throw new Error("Nome da turma é obrigatório.");
        }

        return await this.classRepository.update(
            classId,
            data
        );
    }
}