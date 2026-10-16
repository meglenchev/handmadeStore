import { Schema, model } from "mongoose";

const revokedTokenSchema = new Schema({
    jti: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
});

revokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RevokedToken = model(
    "RevokedToken",
    revokedTokenSchema,
    "revoked_tokens",
);
