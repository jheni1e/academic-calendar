import { IClassRepository } from "../repositories/IClassRepository.ts";

export class GetClassesUseCase {
    constructor(
        private readonly classRepository: IClassRepository
    ) {}

    async execute() {

        return await this.classRepository.findAll();
    }
}