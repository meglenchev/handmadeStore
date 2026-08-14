import { User } from "../models/User.js";

export default {
    async register(username, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new Error("Passwords are not the same!");
        }

        const userExist = await User.exists({
            $or: [{ email }, { username }],
        });

        if (userExist) {
            throw new Error(
                "User with the same email or username already exists!",
            );
        }

        try {
            const user = await User.create({ username, email, password });

            return {
                _id: user._id,
                username: user.username,
                vendorStatus: user.vendorStatus,
                // TODO: Implement user token generation logic
            };
        } catch (err) {
            if (err.code === 11000) {
                throw new Error(
                    "User with the same email or username already exists!",
                );
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
            vendorStatus: user.vendorStatus,
            // TODO: Implement user token generation logic
        };
    },
};
