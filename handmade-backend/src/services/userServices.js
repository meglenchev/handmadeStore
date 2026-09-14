import { User } from "../models/User.js";
import { toUserDTO } from "../utils/userDTO.js";
import { toUserDetails } from "../utils/userDetails.js";

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

            return toUserDTO(user);
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

        return toUserDTO(user);
    },
    async getAddress(userId) {
        const user = await User.findById(userId).select("address");

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        return user.address;
    },
    async addAddress(userId, addressData) {
        const user = await User.findById(userId);

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        // The first added address automatically becomes the default, regardless of what the client submitted
        const isFirstAddress = user.address.length === 0;
        const shouldBeDefault =
            isFirstAddress || addressData.isDefault === true;

        if (shouldBeDefault) {
            user.address.forEach((address) => {
                address.isDefault = false;
            });
        }

        user.address.push({ ...addressData, isDefault: shouldBeDefault });

        await user.save();

        return user.address;
    },
    async getUserDetails(userId) {
        const user = await User.findById(userId);

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        return toUserDetails(user);
    },
    async getMe(userId) {
        const user = await User.findById(userId);

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        return toUserDTO(user);
    },
};
