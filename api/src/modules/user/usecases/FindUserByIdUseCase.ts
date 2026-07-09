import { IUserRepository } from "../repositories/IUserRepository.ts";

export class FindUserByIdUseCase {
    constructor(
        private readonly userRepository : IUserRepository
    ){}

    async execute(id : number) {
        const user = this.userRepository.findById(id)

        if(!user)
            throw new Error("User not found")
        return user
    }
}