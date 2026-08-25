import { Router } from "express";
import userServices from "../services/userServices.js";
import { generateUserToken, authCookieOptions } from "../utils/token.js";

export const userController = Router();

// TODO(refactor): catch блокът се повтаря във всеки route и ще се копира и в
// продуктовите. При 5-6 route-а е хубаво да се извади централен error middleware — контролерите
// правят само next(err), а един handler форматира отговора и статус кода.

userController.post("/users/register", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const user = await userServices.register(
            username,
            email,
            password,
            confirmPassword,
        );

        const token = generateUserToken(user);

        res.cookie("token", token, authCookieOptions);

        res.status(201).json({
            message: "User registered successfully",
            isLoggedIn: true,
            user: {
                _id: user._id,
                username: user.username,
                vendorStatus: user.vendorStatus,
            },
        });
    } catch (err) {
        console.error("Register error:", err);

        res.status(err.statusCode || 500).json({
            message: err.statusCode ? err.message : "Error registering user",
        });
    }
});

userController.post("/users/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userServices.login(email, password);

        const token = generateUserToken(user);

        res.cookie("token", token, authCookieOptions);

        res.status(200).json({
            message: "User logged in successfully",
            isLoggedIn: true,
            user: {
                _id: user._id,
                username: user.username,
                role: user.role,
                vendorStatus: user.vendorStatus,
            },
        });
    } catch (err) {
        console.error("Login error:", err);

        res.status(err.statusCode || 500).json({
            message: err.statusCode ? err.message : "Error logging in",
        });
    }
});

// TODO(auth): Това е "мек" logout — трие само cookie-то от браузъра, но самият
// JWT остава валиден до своя exp. Ако някой е копирал токена преди logout, още
// работи. За истински logout (моментално невалидиране) — token blacklist или
// refresh token ротация.
userController.post("/users/logout", (req, res) => {
    const { maxAge, ...clearOptions } = authCookieOptions;

    res.clearCookie("token", clearOptions);

    res.status(200).json({
        message: "User logged out successfully",
        isLoggedIn: false,
    });
});
