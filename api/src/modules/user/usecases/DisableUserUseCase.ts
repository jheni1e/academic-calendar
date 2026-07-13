import { IUserRepository } from "../repositories/IUserRepository.ts";

export class DisableUserUseCase {
    constructor(
        private readonly userRepository : IUserRepository
    ){}

    async execute(edv : number) {
        const user = this.userRepository.findByEdv(edv)

        if(!user)
            throw new Error("User not found")

        return this.userRepository.disable(edv)
    }
}