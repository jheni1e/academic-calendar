import { IClassRepository } from "../repositories/IClassRepository.ts";

export class DeleteClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(classId: number) {

        const classItem = await this.classRepository.findById(classId);

        if (!classItem) {
            throw new Error("Turma não encontrada.");
        }

        if (classItem.is_active) {
            throw new Error("Apenas turmas inativas podem ser deletadas.");
        }

        // TODO: Need User Type Verification before delete!
        // TODO: Verify if the class has users before deleting.
        // TODO: Verify if the class has subjects before deleting.
        // TODO: Verify if the class has events before deleting.

        await this.classRepository.delete(classId);
    }
}