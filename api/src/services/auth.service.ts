
import { generateToken } from "../app/utils/jwt.ts";
import { comparePassword } from "../app/utils/password.ts";
import { prisma } from "../lib/prisma.ts";


export const login = async (edv: number, password: string) => {
    const user = await prisma.user.findUnique({
        where: { user_edv: edv }
    });

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
        edv: user.user_edv,
        role: user.role
    });
}