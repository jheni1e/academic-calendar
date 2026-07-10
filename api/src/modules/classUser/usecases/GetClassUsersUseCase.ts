import { IClassUserRepository } from "../repositories/IClassUserRepository.ts";

export class GetClassUsersUseCase {
    constructor(
        private readonly classUserRepository: IClassUserRepository
    ) {}

    async execute() {

        return await this.classUserRepository.findAll();
    }
}