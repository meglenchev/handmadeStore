import { User } from "../models/User.js";
import { toUserDTO } from "../utils/userDTO.js";
import { toUserDetails } from "../utils/userDetails.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RevokedToken } from "../models/RevokedToken.js";
import { normalizeEmail } from "../utils/normalizeEmail.js";
import {
    BCRYPT_SALT_ROUNDS,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
} from "../utils/constants.js";

const ADDRESS_FIELDS = [
    "recipientName",
    "phone",
    "country",
    "city",
    "postalCode",
    "addressLine1",
];

const MAX_ADDRESS_FIELD_LENGTH = 200;

const ACCOUNT_FIELDS = ["fullName", "username"];

const INVALID_CREDENTIALS = "Invalid user or password!";
const USER_NOT_FOUND_MSG = "User not found!";
const DUMMY_HASH = await bcrypt.hash("not-a-real-password", BCRYPT_SALT_ROUNDS);

function pickAddressFields(body = {}) {
    const result = {};

    for (const field of ADDRESS_FIELDS) {
        const value = body[field];

        if (value === undefined) {
            continue;
        }

        if (
            typeof value !== "string" ||
            value.length > MAX_ADDRESS_FIELD_LENGTH
        ) {
            throw httpError(400, `Invalid ${field}`);
        }

        result[field] = value.trim();
    }

    if (body.isDefault !== undefined) {
        if (typeof body.isDefault !== "boolean") {
            throw httpError(400, "Invalid isDefault");
        }

        result.isDefault = body.isDefault;
    }

    return result;
}

export default {
    async register(username, email, password, confirmPassword) {
        if (
            password.length < MIN_PASSWORD_LENGTH ||
            password.length > MAX_PASSWORD_LENGTH
        ) {
            throw httpError(
                400,
                `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`,
            );
        }
        const cleanEmail = normalizeEmail(email);

        if (password !== confirmPassword) {
            throw httpError(400, "Passwords are not the same!");
        }

        const userExist = await User.exists({
            $or: [{ email: cleanEmail }, { username }],
        });

        if (userExist) {
            throw httpError(
                409,
                "User with the same email or username already exists!",
            );
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
        if (password.length > MAX_PASSWORD_LENGTH) {
            throw httpError(401, INVALID_CREDENTIALS);
        }

        const user = await User.findOne({
            email: normalizeEmail(email),
        }).select("+password");

        if (!user) {
            await bcrypt.compare(password, DUMMY_HASH);
            throw httpError(401, INVALID_CREDENTIALS);
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            throw httpError(401, INVALID_CREDENTIALS);
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
            throw httpError(404, USER_NOT_FOUND_MSG);
        }

        return user.address;
    },
    async addAddress(userId, addressData) {
        const data = pickAddressFields(addressData);

        const user = await User.findById(userId);

        if (!user) {
            throw httpError(404, USER_NOT_FOUND_MSG);
        }

        if (user.address.length >= 2) {
            throw httpError(409, "You can have a maximum of 2 addresses!");
        }

        // The first added address automatically becomes the default, regardless of what the client submitted
        const isFirstAddress = user.address.length === 0;
        const shouldBeDefault = isFirstAddress || data.isDefault === true;

        if (shouldBeDefault) {
            user.address.forEach((address) => {
                address.isDefault = false;
            });
        }

        user.address.push({ ...data, isDefault: shouldBeDefault });

        await user.save();

        return user.address;
    },
    async updateAddress(userId, addressId, addressData) {
        const updates = pickAddressFields(addressData);

        if (updates.isDefault === false) {
            delete updates.isDefault;
        }

        const user = await User.findById(userId);

        if (!user) {
            throw httpError(404, USER_NOT_FOUND_MSG);
        }

        const address = user.address.id(addressId);

        if (!address) {
            throw httpError(404, "Address not found!");
        }

        address.set(updates);

        if (updates.isDefault === true) {
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
            throw httpError(404, USER_NOT_FOUND_MSG);
        }

        return toUserDetails(user);
    },
    async updateUserDetails(userId, userDetails) {
        const user = await User.findById(userId);

        if (!user) {
            throw httpError(404, USER_NOT_FOUND_MSG);
        }

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
        if (
            currentPassword.length > MAX_PASSWORD_LENGTH ||
            newPassword.length > MAX_PASSWORD_LENGTH ||
            newPassword < MIN_PASSWORD_LENGTH
        ) {
            throw httpError(
                400,
                `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`,
            );
        }

        const user = await User.findById(userId).select("+password");

        if (!user) {
            throw httpError(404, USER_NOT_FOUND_MSG);
        }

        const isValid = await user.comparePassword(currentPassword);

        if (!isValid) {
            throw httpError(400, "Invalid current password!");
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
            throw httpError(404, USER_NOT_FOUND_MSG);
        }

        return toUserDTO(user);
    },
};
