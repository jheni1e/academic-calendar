import { generateToken } from "../../app/utils/jwt.ts";
import { comparePassword } from "../../app/utils/password.ts";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository.ts";
import { IAssignmentRepository } from "../../modules/assignment/repositories/IAssignmentRepository.ts";
import { PrismaAssignmentRepository } from "../../modules/assignment/repositories/PrismaAssignmentRepository.ts";


export class AuthService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly assignmentRepository : IAssignmentRepository
    ) {}

    async login(edv: number, password: string) {

        const user = await this.userRepository.findByEdv(edv);

        if (!user) {
            throw new Error("User not found");
        }

        const isCorrect = await comparePassword(
            password,
            user.password
        );

        if (!isCorrect) {
            throw new Error("Invalid password");
        }
    
        const assignments = await this.assignmentRepository.findByUserId(user.user_id);
        const roles = assignments.map(a => a.role.name);

        return generateToken({
            id: user.user_id,
            edv: user.user_edv,
            role: roles
        });

    }

}