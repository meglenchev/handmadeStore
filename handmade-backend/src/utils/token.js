import jwt from "jsonwebtoken";

export function generateUserToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
        vendorStatus: user.vendorStatus,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
};
