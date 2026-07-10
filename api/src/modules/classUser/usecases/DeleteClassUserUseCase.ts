import { IClassUserRepository } from "../repositories/IClassUserRepository.ts";

export class DeleteClassUserUseCase {
    constructor(
        private readonly classUserRepository: IClassUserRepository
    ) {}

    async execute(classUserId: number) {

        const classUser =
            await this.classUserRepository.findById(classUserId);

        if (!classUser) {
            throw new Error("Vínculo não encontrado.");
        }

        // TODO: Need User Type Verification before delete!

        await this.classUserRepository.delete(classUserId);
    }
}