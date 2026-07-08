import { generateToken } from "../../app/utils/jwt.ts";
import { comparePassword } from "../../app/utils/password.ts";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository.ts";
<<<<<<< HEAD
import { IAssignmentRepository } from "../../modules/assignment/repositories/IAssignmentRepository.ts";
import { PrismaAssignmentRepository } from "../../modules/assignment/repositories/PrismaAssignmentRepository.ts";
export class AuthService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly assignmentRepository : IAssignmentRepository
    ) {}

    async login(edv: number, password: string) {
        console.log(typeof edv, edv)
=======

export class AuthService {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async login(edv: number, password: string) {

>>>>>>> ea0a04e (feat: create login usecase + jwt config)
        const user = await this.userRepository.findByEdv(edv);

        if (!user) {
            throw new Error("User not found");
        }

        const isCorrect = await comparePassword(
            password,
            user.password
        );

        if (!isCorrect) {
<<<<<<< HEAD
            throw new Error("Invalid password");
        }
        
        const role = await this.assignmentRepository.findByUserId(user.user_id)
=======
            throw new Error("Invalid");
        }
>>>>>>> ea0a04e (feat: create login usecase + jwt config)

        return generateToken({
            id: user.user_id,
            edv: user.user_edv,
<<<<<<< HEAD
            role: role
=======
            role: user.role
>>>>>>> ea0a04e (feat: create login usecase + jwt config)
        });

    }

}