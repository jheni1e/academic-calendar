import { IUserRepository } from "../repositories/IUserRepository.ts";

export class FindAllUsersUseCase {
    constructor (
        private readonly userRepository : IUserRepository
    ){}

    async execute(){
        return this.userRepository.findAll();
    }
}