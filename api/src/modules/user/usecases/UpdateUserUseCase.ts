import { IUserRepository } from "../repositories/IUserRepository.ts";
import { UpdateUserDTO } from "../UserDto.ts";

export class UpdateUserUseCase {
    constructor (
        private readonly userRepository : IUserRepository
    ){}

    async execute(id : number, data : UpdateUserDTO) {
        const user = this.userRepository.findById(id)

        if(!user)
            throw new Error("User not found")
        
        return this.userRepository.update(id, data)
    }
}