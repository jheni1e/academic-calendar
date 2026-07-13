import { SignOptions } from "jsonwebtoken";

export const authConfig = {
    secret: process.env.JWT_SECRET!,
    expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"]
};


console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("authConfig:", authConfig);
