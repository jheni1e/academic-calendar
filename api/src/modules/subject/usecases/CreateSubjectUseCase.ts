import { ISubjectRepository } from "../repositories/ISubjectRepository.ts";
import { CreateSubjectDTO } from "../../../dtos/SubjectDto.ts";

export class CreateSubjectUseCase {
    constructor(
        private readonly subjectRepository: ISubjectRepository
    ) {}

    async execute(data: CreateSubjectDTO) {

        if (!data.name.trim()) {
            throw new Error("Nome da matéria é obrigatório.");
        }

        // if (data.workload <= 0) {
        //     throw new Error("A carga horária deve ser maior que zero.");
        // }

        if (data.startDate >= data.endDate) {
            throw new Error("A data de início deve ser anterior à data de término.");
        }

        return await this.subjectRepository.create(data);
    }
}