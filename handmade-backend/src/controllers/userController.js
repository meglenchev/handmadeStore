import { Router } from "express";
import userServices from "../services/userServices.js";
import { generateUserToken, authCookieOptions } from "../utils/token.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const userController = Router();

// TODO(refactor): catch блокът се повтаря във всеки route и ще се копира и в
// продуктовите. При 5-6 route-а е хубаво да се извади централен error middleware — контролерите
// правят само next(err), а един handler форматира отговора и статус кода.

userController.post("/users/register", async (req, res, next) => {
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
            user,
        });
    } catch (err) {
        next(err);
    }
});

userController.post("/users/login", async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userServices.login(email, password);

        const token = generateUserToken(user);

        res.cookie("token", token, authCookieOptions);

        res.status(200).json({
            message: "User logged in successfully",
            isLoggedIn: true,
            user,
        });
    } catch (err) {
        next(err);
    }
});

// Logout: трие бисквитката и анулира токена (jti -> revoked_tokens), така че
// verifyToken го отхвърля веднага, дори ако е бил копиран преди logout.
// Без verifyToken нарочно - изтекла/невалидна сесия също трябва да може да излезе.
userController.post("/users/logout", async (req, res, next) => {
    const { maxAge, ...clearOptions } = authCookieOptions;

    res.clearCookie("token", clearOptions);

    try {
        await userServices.revokeToken(req.cookies?.token);

        res.status(200).json({
            message: "User logged out successfully",
            isLoggedIn: false,
        });
    } catch (err) {
        next(err);
    }
});

/* Get User Address */
userController.get(
    "/users/account/address",

    verifyToken(),

    async (req, res, next) => {
        try {
            const address = await userServices.getAddress(req.user._id);
            res.status(200).json({ address });
        } catch (err) {
            next(err);
        }
    },
);

/* Add User Address */
userController.post(
    "/users/account/address",

    verifyToken(),

    async (req, res, next) => {
        // prettier-ignore
        const { 
            recipientName, 
            phone, 
            country, 
            city, 
            postalCode, 
            addressLine1 
        } = req.body;

        try {
            const address = await userServices.addAddress(req.user._id, {
                recipientName,
                phone,
                country,
                city,
                postalCode,
                addressLine1,
            });
            res.status(201).json({ address });
        } catch (err) {
            next(err);
        }
    },
);

/* Update User Address */
userController.patch(
    "/users/account/address/:addressId",

    verifyToken(),

    async (req, res, next) => {
        try {
            const { addressId } = req.params;
            const {
                recipientName,
                phone,
                country,
                city,
                postalCode,
                addressLine1,
            } = req.body;

            const address = await userServices.updateAddress(
                req.user._id,
                addressId,
                {
                    recipientName,
                    phone,
                    country,
                    city,
                    postalCode,
                    addressLine1,
                },
            );
            res.status(200).json({ address });
        } catch (err) {
            next(err);
        }
    },
);

/* Get User Details */
userController.get(
    "/users/account/details",

    verifyToken(),

    async (req, res, next) => {
        try {
            const user = await userServices.getUserDetails(req.user._id);
            res.status(200).json({ user });
        } catch (err) {
            next(err);
        }
    },
);

/* Update User Details */
userController.patch(
    "/users/account/details",

    verifyToken(),

    async (req, res, next) => {
        try {
            const { username, fullName } = req.body;

            const user = await userServices.updateUserDetails(req.user._id, {
                username,
                fullName,
            });

            res.status(200).json({ user });
        } catch (err) {
            next(err);
        }
    },
);

/* Change User Password */
userController.patch(
    "/users/account/password",

    verifyToken(),

    async (req, res, next) => {
        try {
            const { currentPassword, newPassword } = req.body;

            await userServices.changePassword(
                req.user._id,
                currentPassword,
                newPassword,
            );
            res.status(200).json({ message: "Password changed successfully" });
        } catch (err) {
            next(err);
        }
    },
);

/* Get Current User */
userController.get("/users/me", verifyToken(), async (req, res, next) => {
    try {
        const user = await userServices.getMe(req.user._id);
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});
