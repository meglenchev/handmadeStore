import { User } from "../models/User.js";

export default {
    async register(username, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            const err = new Error("Passwords are not the same!");
            err.statusCode = 400;
            throw err;
        }

        const userExist = await User.exists({
            $or: [{ email }, { username }],
        });

        if (userExist) {
            const err = new Error(
                "User with the same email or username already exists!",
            );
            err.statusCode = 409;
            throw err;
        }

        try {
            const user = await User.create({ username, email, password });

            return {
                _id: user._id,
                username: user.username,
                vendorStatus: user.vendorStatus,
            };
        } catch (err) {
            if (err.code === 11000) {
                const dupErr = new Error(
                    "User with the same email or username already exists!",
                );
                dupErr.statusCode = 409;
                throw dupErr;
            }

            throw err;
        }
    },
    async login(email, password) {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            const err = new Error("Invalid user or password!");
            err.statusCode = 401;
            throw err;
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            const err = new Error("Invalid user or password!");
            err.statusCode = 401;
            throw err;
        }

        return {
            _id: user._id,
            username: user.username,
            role: user.role,
            vendorStatus: user.vendorStatus,
        };
    },
    async getMe(userId) {
        const user = await User.findById(userId);

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        return {
            _id: user._id,
            username: user.username,
            role: user.role,
            vendorStatus: user.vendorStatus,
        };
    },
};
