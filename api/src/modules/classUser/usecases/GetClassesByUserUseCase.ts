import { IClassUserRepository } from "../repositories/IClassUserRepository.ts";

export class GetClassesByUserUseCase {
    constructor(
        private readonly classUserRepository: IClassUserRepository
    ) {}

    async execute(userId: number) {

        return await this.classUserRepository.findByUser(userId);
    }
}