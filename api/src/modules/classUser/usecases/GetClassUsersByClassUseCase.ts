import { IClassUserRepository } from "../repositories/IClassUserRepository.ts";

export class GetClassUsersByClassUseCase {
    constructor(
        private readonly classUserRepository: IClassUserRepository
    ) {}

    async execute(classId: number) {

        return await this.classUserRepository.findByClass(classId);
    }
}