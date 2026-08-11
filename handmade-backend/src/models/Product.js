import { Schema, model } from "mongoose";
import { slugify } from "../utils/slugify.js";

const productSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Title is required"],
            minLength: [5, "Title should be at least 5 characters long"],
        },
        slug: {
            type: String,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
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
            maxLength: [100, "Short description cannot exceed 100 characters"],
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
            default: 0,
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
        // TODO: add when entering auth
        // vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true, index: true },
    },
    { timestamps: true },
);

productSchema.virtual("discount").get(function () {
    if (!this.oldPrice || this.oldPrice <= this.newPrice) {
        return 0;
    }
    return Math.round(((this.newPrice - this.oldPrice) / this.oldPrice) * 100);
});

productSchema.pre("save", async function (next) {
    if (!this.isModified("title")) {
        return next();
    }

    const baseSlug = slugify(this.title);
    let slug = baseSlug;
    let counter = 1;

    while (await this.constructor.exists({ slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
    next();
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export const Product = model("Product", productSchema, "product");
