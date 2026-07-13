import { hashPassword } from "../../../app/utils/password.ts";
import { IUserRepository } from "../repositories/IUserRepository.ts";
import { CreateUserDTO } from "../UserDto.ts";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly assign
    ){}

    async execute(data: CreateUserDTO) {
        const exists = await this.userRepository.findByEdv(data.edv)

        if(exists)
            throw new Error("User already has an account")
    
        const password = await hashPassword(data.password)

        const user = await this.userRepository.create({
            ...data,
            password
        })

        await 
    }
    
}