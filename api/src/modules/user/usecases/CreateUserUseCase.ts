import { hashPassword } from "../../../app/utils/password.ts";
import { IUserRepository } from "../repositories/IUserRepository.ts";
import { CreateUserDTO } from "../UserDto.ts";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository : IUserRepository
    ){}

    async execute(data: CreateUserDTO) {
        const exists = await this.userRepository.findByEdv(data.edv)

        if(exists)
            throw new Error("User already has an account")
    
        const password = await hashPassword(data.password)

        return this.userRepository.create({
            ...data,
            password
        })
    }
    
}