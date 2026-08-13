import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
            minLength: [3, "Username should be at least 3 characters long!"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password should be at least 8 characters long"],
            maxLength: [72, "Password cannot exceed 72 characters"],
            select: false, // NB: Спира връщането на паролата по подразбиране.
            // При login търси с .select("+password"), иначе comparePassword сравнява с undefined.
        },
        role: {
            type: String,
            enum: ["user", "admin", "moderator"],
            default: "user",
            index: true,
        },
        vendorStatus: {
            type: String,
            enum: ["none", "pending", "approved", "suspended"],
            default: "none",
            index: true,
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) {
        throw new Error("Password not selected. Use .select('+password')");
    }

    return await bcrypt.compare(candidatePassword, this.password);
};

// Предпазна мрежа: маха паролата от всеки JSON отговор дори ако е била
// селектната изрично с .select("+password"). select: false пази при четене,
// това пази при сериализация — така хешът не изтича към клиента.
userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

userSchema.set("toObject", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

export const User = model("User", userSchema, "users");
