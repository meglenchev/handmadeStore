import { User } from "../models/User.js";
import { toUserDTO } from "../utils/userDTO.js";
import { toUserDetails } from "../utils/userDetails.js";

const ADDRESS_FIELDS = [
    "recipientName",
    "phone",
    "country",
    "city",
    "postalCode",
    "addressLine1",
];

const ACCOUNT_FIELDS = ["fullName", "username"];

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

        if (user.address.length >= 2) {
            const err = new Error("You can have a maximum of 2 addresses!");
            err.statusCode = 409;
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
    async updateAddress(userId, addressId, addressData) {
        const user = await User.findById(userId);

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        const address = user.address.id(addressId);

        if (!address) {
            const err = new Error("Адресът не е намерен!");
            err.statusCode = 404;
            throw err;
        }

        const updates = Object.fromEntries(
            ADDRESS_FIELDS.filter(
                (field) => addressData[field] !== undefined,
            ).map((field) => [field, addressData[field]]),
        );

        address.set(updates);

        if (addressData.isDefault === true) {
            user.address.forEach((a) => {
                a.isDefault = a._id.equals(address._id);
            });
        }

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
    async updateUserDetails(userId, userDetails) {
        const user = await User.findById(userId);

        if (!user) throw httpError(404, "Потребителят не е намерен!");

        const updates = Object.fromEntries(
            ACCOUNT_FIELDS.filter((f) => userDetails[f] !== undefined).map(
                (f) => [f, userDetails[f]],
            ),
        );

        user.set(updates);

        await user.save();

        return toUserDetails(user);
    },
    async changePassword(userId, currentPassword, newPassword) {
        const user = await User.findById(userId).select("+password");

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        const isValid = await user.comparePassword(currentPassword);

        if (!isValid) {
            const err = new Error("Invalid current password!");
            err.statusCode = 400;
            throw err;
        }

        user.password = newPassword;

        await user.save();

        // TODO (сигурност): Старите JWT токени остават валидни до изтичането си (1 час).
        // Ако някой има откраднато cookie, смяната на паролата не го спира веднага.
        // За тази фаза на проекта рискът е малък, затова е отложено.
        // Строго решение: поле `passwordChangedAt` в User модела (да се задава преди save(),
        // т.е. user.passwordChangedAt = new Date()) и проверка във `verifyToken` дали `iat`
        // на токена е по-нов от него. Цена: една заявка към базата на всяка защитена
        // заявка, затова се прави, когато реално се наложи.
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
