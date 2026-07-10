import { CreateClassUserDTO } from "../ClassUserDto.ts";
import { IClassUserRepository } from "../repositories/IClassUserRepository.ts";

export class CreateClassUserUseCase {
    constructor(
        private readonly classUserRepository: IClassUserRepository
    ) {}

    async execute(data: CreateClassUserDTO) {

        const classUser =
            await this.classUserRepository.findByClassAndUser(
                data.classId,
                data.userId
            );

        if (classUser) {
            throw new Error("O usuário já pertence a essa turma.");
        }

        return await this.classUserRepository.create(data);
    }
}