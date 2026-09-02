import jwt from "jsonwebtoken";
import { toUserDTO } from "./userDTO.js";

export function generateUserToken(user) {
    const payload = toUserDTO(user);

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
};
