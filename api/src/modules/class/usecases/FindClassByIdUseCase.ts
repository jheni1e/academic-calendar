import { IClassRepository } from "../repositories/IClassRepository.ts";

export class FindClassByIdUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(classId: number) {

        const classItem = await this.classRepository.findById(classId);

        if (!classItem) {
            throw new Error("Turma não encontrada.");
        }

        return classItem;
    }
}