import { CreateClassDTO } from "../ClassDTO.ts";
import { IClassRepository } from "../repositories/IClassRepository.ts";

export class CreateClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute(data: CreateClassDTO) {

        // Verifica se o nome foi informado
        if (!data.name.trim()) {
            throw new Error("Nome da turma é obrigatório.");
        }

        return await this.classRepository.create(data);
    }
}