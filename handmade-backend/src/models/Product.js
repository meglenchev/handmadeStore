import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Title is required"],
            minLength: [5, "Title should be at least 5 characters long"],
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Description is required"],
            minLength: [
                150,
                "Description should be at least 150 characters long",
            ],
        },
        shortDescription: {
            type: String,
            trim: true,
            required: [true, "Short description is required"],
            maxLength: [100, "Short description cannot exceed 150 characters"],
        },
        oldPrice: {
            type: Number,
            min: [0, "Old Price should be a positive number"],
            default: null,
        },
        newPrice: {
            type: Number,
            required: [true, "New Price is required"],
            min: [0, "New Price should be a positive number"],
        },
        outofstock: {
            type: Boolean,
            required: [true, "Out of Stock status is required"],
            default: false,
        },
        images: {
            sliderLandscape: {
                type: String,
                trim: true,
                required: true,
                //match: [/^https?:\/\//, "Image URL is invalid"],
            }, // Slider image (3:2)
            gallery: [
                {
                    type: String,
                    trim: true,
                    required: true,
                    //match: [/^https?:\/\//, "Image URL is invalid"],
                },
            ], // Gallery image (9:16)
        },
        sold: {
            type: Number,
            required: [true, "Sold quantity is required"],
            min: [0, "Sold quantity should be a positive number"],
        },
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock quantity should be a positive number"],
        },
        category: {
            type: String,
            index: true,
            lowercase: true,
            trim: true,
            required: [true, "Category is required"],
            minLength: [3, "Category should be at least 3 characters long"],
        },
        size: {
            type: [String],
            default: [],
        },
        code: {
            type: String,
            index: true,
            trim: true,
            lowercase: true,
            default: null,
        },
        tags: {
            type: [String],
            index: true,
            trim: true,
            lowercase: true,
            default: [],
        },
        createdAt: { type: Date },
    },
    { timestamps: true },
);

export const Product = model("Product", productSchema, "product");
