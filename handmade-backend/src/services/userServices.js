import { User } from "../models/User.js";
import { toUserDTO } from "../utils/userDTO.js";
import { toUserDetails } from "../utils/userDetails.js";
import jwt from "jsonwebtoken";
import { RevokedToken } from "../models/RevokedToken.js";
import { normalizeEmail } from "../utils/normalizeEmail.js";

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
        const cleanEmail = normalizeEmail(email);

        if (password !== confirmPassword) {
            const err = new Error("Passwords are not the same!");
            err.statusCode = 400;
            throw err;
        }

        const userExist = await User.exists({
            $or: [{ email: cleanEmail }, { username }],
        });

        if (userExist) {
            const err = new Error(
                "User with the same email or username already exists!",
            );
            err.statusCode = 409;
            throw err;
        }

        try {
            const user = await User.create({
                username,
                email: cleanEmail,
                password,
            });

            return toUserDTO(user);
        } catch (err) {
            throw err;
        }
    },
    async login(email, password) {
        const user = await User.findOne({
            email: normalizeEmail(email),
        }).select("+password");

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
    /**
     * Анулира JWT, като записва неговия jti в revoked_tokens с expiresAt = exp на токена.
     * TTL индексът върху expiresAt трие записа автоматично, когато токенът изтече.
     * Липсващ, невалиден, изтекъл токен или токен без jti се пропуска тихо (няма какво да се анулира).
     * Грешка от базата се хвърля нагоре (-> 500 през errorHandler).
     * @param {string | undefined} token JWT от бисквитката "token".
     */
    async revokeToken(token) {
        if (!token) {
            return;
        }

        let decodedToken;

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // If the token is invalid or expired, we don't need to revoke it
            return;
        }

        if (!decodedToken || !decodedToken.jti) {
            return;
        }

        await RevokedToken.updateOne(
            { jti: decodedToken.jti },
            {
                $setOnInsert: {
                    jti: decodedToken.jti,
                    expiresAt: new Date(decodedToken.exp * 1000),
                },
            },
            { upsert: true },
        );
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

        // TODO (сигурност): В момента смяната на паролата не анулира нито един токен.
        // План: текущият токен да се анулира със същия revokeToken (контролерът трябва
        // да подаде req.cookies.token). Останалите токени на потребителя (други устройства)
        // ще остават валидни до изтичането си (до 1 час) — за тях е нужно отделно решение
        // (напр. passwordChangedAt/tokenVersion в User и проверка на iat във verifyToken).
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
