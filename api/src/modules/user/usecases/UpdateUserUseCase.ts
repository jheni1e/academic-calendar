import { PrismaAssignmentRepository } from "../../assignment/repositories/PrismaAssignmentRepository.ts";
import { PrismaRoleRepository } from "../../role/repositories/PrismaRoleRepository.ts";
import { IUserRepository } from "../repositories/IUserRepository.ts";
import { IRoleRepository } from "../../role/repositories/IRoleRepository.ts";
import { UpdateUserDTO } from "../../../dtos/UserDto.ts";
import { IAssignmentRepository } from "../../assignment/repositories/IAssignmentRepository.ts";

export class UpdateUserUseCase {

    constructor (
        private readonly userRepository : IUserRepository,
        private readonly roleRepository : IRoleRepository,
    private readonly assignmentRepository : IAssignmentRepository
    ){}

    async execute(id : number, data : UpdateUserDTO) {
        const user = await this.userRepository.findById(id)

        if(!user)
            throw new Error("User not found")
        
        const assignments = await this.assignmentRepository.findByUserId(user.user_id)
        const currentRoleIds = assignments.map(a => a.role_id)

        if(data.roleToAdd) {
            const role = await this.roleRepository.findByName(data.roleToAdd)

            if(!role)
                throw new Error("Role not found")

            if(!currentRoleIds.includes(role.role_id)) {
                await this.assignmentRepository.create({
                    roleId : role.role_id, 
                    userId : user.user_id
                })
            }
        }

        if(data.roleToRemove) {
            const role = await this.roleRepository.findByName(data.roleToRemove)

            if(!role)
                throw new Error("Role not found")

            
            if(currentRoleIds.includes(role.role_id)) {
                if (currentRoleIds.length === 1) 
                    throw new Error("User must have at least one role");

                const assignment = assignments.find(
                    a => a.role_id === role.role_id
                );
                
                if (!assignment) {
                    throw new Error("Assignment not found.");
                }
            
                await this.assignmentRepository.delete(
                    assignment.assignment_id
                );
            }
        }

        const updatedUser = await this.userRepository.update(id, data)
        return {
            ...updatedUser,
            roles : assignments.map(a => a)
        }
    }
}