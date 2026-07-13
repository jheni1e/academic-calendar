import { IUserRepository } from "../repositories/IUserRepository.ts";

export class FindUserByEdvUseCase {
    constructor(
        private readonly userRepository : IUserRepository
    ){}

    async execute(edv : number){
        const user = await this.userRepository.findByEdv(edv)

        if(!user)
            throw new Error("User not found")
        return user
    }
}