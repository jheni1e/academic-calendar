import bcrypt from "bcrypt"

export async function hashPassword(password : string) {
    return bcrypt.hash(password, 10); // salt rounds
}

export async function comparePassword(
    password : string,
    hash : string
) {
    return bcrypt.compare(password, hash);
}