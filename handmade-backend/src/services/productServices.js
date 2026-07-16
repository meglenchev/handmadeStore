import { Product } from "../models/Product.js";

export default {
    create(productData, ownerId) {
        return Product.create({ ...productData, ownerId });
    },
    getAll(filters) {
        let query = {};

        if (filters.tag) {
            query.tag = filters.tag;
        }

        if (filters.category) {
            query.category = filters.category;
        }

        if (filters.code) {
            query.code = filters.code;
        }

        return Product.find(query).sort({ createdAt: -1 });
    },
    getOne(productId) {
        return Product.findById(productId);
    },
    getLatest(category, limit) {
        const query = category === "all" ? {} : { category };
        return Product.find(query).sort({ createdAt: -1 }).limit(limit);
    },
    getTopDiscounted() {
        return Product.aggregate([
            {
                $match: {
                    outofstock: false,
                    oldPrice: { $exists: true, $gt: 0 },
                },
            },
            {
                $addFields: {
                    discount: {
                        $multiply: [
                            {
                                $divide: [
                                    { $subtract: ["$newPrice", "$oldPrice"] },
                                    "$oldPrice",
                                ],
                            },
                            100,
                        ],
                    },
                },
            },
            {
                $match: {
                    discount: { $lt: -10 },
                },
            },
            { $sort: { discount: 1 } },
            { $limit: 12 },
        ]);
    },
    getBestSellers() {
        return Product.find({ outofstock: false }).sort({ sold: -1 }).limit(12);
    },
    getSpecialProducts() {
        return Product.aggregate([
            { $match: { outofstock: false } },
            { $sample: { size: 3 } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    images: "$images.sliderLandscape",
                    newPrice: 1,
                    category: 1,
                },
            },
        ]);
    },
    getCartProducts(productIds) {
        return Product.find({ _id: { $in: productIds } }).select({
            title: 1,
            newPrice: 1,
            stock: 1,
            "images.gallery": { $slice: 1 },
        });
    },

    getProductsCategory() {
        return Product.find().distinct("category");
    },
    getSearchResults(query, category) {
        let filter = {};
        let conditions = [];

        const cleanQuery = query ? query.trim() : "";

        if (cleanQuery) {
            const searchRegex = new RegExp(cleanQuery, "i");
            conditions.push({
                $or: [{ title: searchRegex }, { category: searchRegex }],
            });
        }

        if (category && category.trim() !== "" && category !== "all") {
            conditions.push({
                category: new RegExp(`^${category.trim()}$`, "i"),
            });
        }

        if (conditions.length > 0) {
            filter = { $and: conditions };
        }

        return Product.find(filter).select({
            title: 1,
            category: 1,
            newPrice: 1,
            "images.gallery": { $slice: 2 },
        });
    },
};
