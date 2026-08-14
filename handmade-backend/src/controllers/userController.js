import { Router } from "express";
import userServices from "../services/userServices.js";

export const userController = Router();

userController.post("/users/register", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const user = await userServices.register(
            username,
            email,
            password,
            confirmPassword,
        );

        // TODO: Implement user token generation logic

        res.status(201).json({
            message: "User registered successfully",
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

        // TODO: Implement user token generation logic

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
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
