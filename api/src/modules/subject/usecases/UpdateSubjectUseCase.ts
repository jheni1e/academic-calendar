import { ISubjectRepository } from "../repositories/ISubjectRepository.ts";
import { UpdateSubjectDTO } from "../../../dtos/SubjectDto.ts";

export class UpdateSubjectUseCase {
    constructor(
        private readonly subjectRepository: ISubjectRepository
    ) {}

    async execute(subjectId: number, data: UpdateSubjectDTO) {

        const subject = await this.subjectRepository.findById(subjectId);

        if (!subject) {
            throw new Error("Matéria não encontrada.");
        }

        if (data.name !== undefined && !data.name.trim()) {
            throw new Error("Nome da matéria é obrigatório.");
        }

        if (data.workload !== undefined && data.workload <= 0) {
            throw new Error("A carga horária deve ser maior que zero.");
        }

        const startDate = data.startDate ?? subject.start_date;
        const endDate = data.endDate ?? subject.end_date;

        if (startDate >= endDate) {
            throw new Error("A data de início deve ser anterior à data de término.");
        }

        return await this.subjectRepository.update(subjectId, data);
    }
}