import { IClassUserRepository } from "../repositories/IClassUserRepository.ts";

export class FindClassUserByIdUseCase {
    constructor(
        private readonly classUserRepository: IClassUserRepository
    ) {}

    async execute(classUserId: number) {

        const classUser =
            await this.classUserRepository.findById(classUserId);

        if (!classUser) {
            throw new Error("Assignment not found.");
        }

        return classUser;
    }
}