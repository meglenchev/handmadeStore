import jwt from "jsonwebtoken";
import { RevokedToken } from "../models/RevokedToken.js";

/**
 * Проверява JWT от httpOnly бисквитката "token" и записва payload-а в req.user.
 * Първо jwt.verify, после проверка в revoked_tokens дали токенът е анулиран (logout).
 * - 401: липсва токен, невалиден/изтекъл токен, токен без jti (издаден преди
 *   въвеждането на jti) или jti, който е в revoked_tokens.
 * - 403: подадени са allowedRoles и ролята на потребителя не е сред тях.
 * - 500: грешка от базата при проверката в revoked_tokens (през next(err) към errorHandler).
 * @param {string[]} [allowedRoles=[]] Разрешени роли; празен масив = всяка роля.
 */
export function verifyToken(allowedRoles = []) {
    return async (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied. No token provided." });
        }

        let decodedToken;

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res
                    .status(401)
                    .json({ message: "Token expired. Please login again." });
            }

            return res.status(401).json({ message: "Invalid token." });
        }

        try {
            if (
                !decodedToken.jti ||
                (await RevokedToken.exists({ jti: decodedToken.jti }))
            ) {
                return res.status(401).json({
                    message: "Session is no longer valid. Please login again!",
                });
            }
        } catch (err) {
            return next(err); // DB проблем = 500, не "Invalid token"
        }

        req.user = decodedToken;

        if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have the required permissions!",
            });
        }

        next();
    };
}
