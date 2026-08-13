import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export default {
    async register(username, email, password, confirmPassword) {
        // TODO: Implement user registration logic
        if (password !== confirmPassword) {
            throw new Error("Passwords are not the same!");
        }

        const userExist = await User.exists({
            $or: [{ email }, { username }],
        }).lean();

        if (userExist) {
            throw new Error(
                "User with the same email or username already exists!",
            );
        }

        const user = await User.create({ username, email, password });

        return {
            _id: user._id,
            email: user.email,
            role: user.role,
            // TODO: Implement user token generation logic
        };
    },
    async login(email, password) {
        // TODO: Implement user registration logic
    },
};
