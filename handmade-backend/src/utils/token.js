import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export function generateUserToken(user) {
    const payload = { _id: user._id, role: user.role };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
        jwtid: randomUUID(),
    });
}

export const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
};
