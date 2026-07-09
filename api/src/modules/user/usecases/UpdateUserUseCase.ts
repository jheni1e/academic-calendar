import { IUserRepository } from "../repositories/IUserRepository.ts";
import { UpdateUserDTO } from "../UserDto.ts";

export class UpdateUserUseCase {
    constructor (
        private readonly userRepository : IUserRepository
    ){}

    async execute(edv : number, data : UpdateUserDTO) {
        const user = this.userRepository.findByEdv(edv)

        if(!user)
            throw new Error("User not found")
        
        return this.userRepository.update(edv, data)
    }
}