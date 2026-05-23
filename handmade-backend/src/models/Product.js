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
                20,
                "Description should be at least 20 characters long",
            ],
        },
        oldPrice: {
            type: Number,
            required: [true, "Old Price is required"],
            min: [0, "Old Price should be a positive number"],
        },
        newPrice: {
            type: Number,
            required: [true, "New Price is required"],
            min: [0, "New Price should be a positive number"],
        },
        discont: {
            type: Number,
            min: [-100, "Discont should be between -100 and 0"],
            max: [0, "Discont should be between -100 and 0"],
        },
        outofstock: {
            type: Boolean,
            required: [true, "Out of Stock status is required"],
            default: false,
        },
        image: {
            type: String,
            trim: true,
            required: [true, "Image URL is required"],
            //match: [/^https?:\/\//, "Image URL is invalid"],
        },
        hoverImage: {
            type: String,
            trim: true,
            required: [true, "Hover image URL is required"],
            //match: [/^https?:\/\//, "Hover image URL is invalid"],
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
    },
    { timestamps: true },
);

export const Product = model("Product", productSchema, "product");
