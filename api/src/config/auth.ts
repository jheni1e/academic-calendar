import { SignOptions } from "jsonwebtoken";

export const authConfig: {
  secret: string;
  expiresIn: SignOptions["expiresIn"];
} = {
  secret: process.env.JWT_SECRET!,
  expiresIn: "1h",
};