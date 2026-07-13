import jwt from "jsonwebtoken"
import { authConfig } from "../../config/auth.ts"

export function generateToken(payload: object) {
    return jwt.sign(payload, authConfig.secret, {
        expiresIn: authConfig.expiresIn
    })
}

export function verifyToken(token: string) {
    return jwt.verify(token, authConfig.secret)
}