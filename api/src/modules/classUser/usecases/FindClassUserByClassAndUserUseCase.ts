import { IClassUserRepository } from "../repositories/IClassUserRepository.ts";

export class FindClassUserByClassAndUserUseCase {
    constructor(
        private readonly classUserRepository: IClassUserRepository
    ) {}

    async execute(
        classId: number,
        userId: number
    ) {

        const classUser =
            await this.classUserRepository.findByClassAndUser(
                classId,
                userId
            );

        if (!classUser) {
            throw new Error("Assignment not found.");
        }

        return classUser;
    }
}