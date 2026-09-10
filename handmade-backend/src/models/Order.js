import { Schema } from "mongoose";

const orderItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],
        },
        image: {
            type: String,
        },
    },
    { _id: false },
);

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: [arrayLimit, "Order must have at least one item"],
        },
        shoppingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            country: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
        },
        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "pending",
            index: true,
        },
        paymentStatus: {
            type: String,
            enum: ["unpaid", "paid", "refunded"],
            default: "unpaid",
            index: true,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Total amount must be a positive number"],
        },
    },
    { timestamps: true },
);

orderSchema.index({ user: 1, createdAt: -1 });

export const Order = mongoose.model("Order", orderSchema, "orders");
