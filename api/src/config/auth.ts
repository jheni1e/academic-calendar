import { SignOptions } from "jsonwebtoken";

export const authConfig = {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
};