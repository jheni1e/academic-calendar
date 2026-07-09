import { generateToken } from "../../app/utils/jwt.ts";
import { comparePassword } from "../../app/utils/password.ts";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository.ts";

export class AuthService {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async login(edv: number, password: string) {
        console.log(typeof edv, edv)
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

        return generateToken({
            id: user.user_id,
            edv: user.user_edv
            // role: user.role
        });

    }

}