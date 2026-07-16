import { hashPassword } from "../../../app/utils/password.ts";
import { IAssignmentRepository } from "../../assignment/repositories/IAssignmentRepository.ts";
import { IRoleRepository } from "../../role/repositories/IRoleRepository.ts";
import { IUserRepository } from "../repositories/IUserRepository.ts";
import { CreateUserDTO } from "../../../dtos/UserDto.ts";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly assignmentRepository : IAssignmentRepository,
        private readonly roleRepository : IRoleRepository
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

        for(const element of data.role) {
            const role = await this.roleRepository.findByName(element)

            if(!role)
                throw new Error("Role not found")

            await this.assignmentRepository.create({
                userId : user.user_id,
                roleId : role.role_id
            })
        }

        const assignments = await this.assignmentRepository.findByUserId(user.user_id)

        return {
                user,
                roles : assignments.map(a => a)
            }
        
    }
}