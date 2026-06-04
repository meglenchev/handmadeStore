import { Product } from "../models/Product.js";

export default {
    create(productData, ownerId) {
        return Product.create({ ...productData, ownerId });
    },
    getAll() {
        return Product.find().sort({ createdAt: -1 });
    },
    getOne(productId) {
        return Product.findById(productId);
    },
    getLatest(category, limit) {
        const query = category === "all" ? {} : { category };
        return Product.find(query).sort({ createdAt: -1 }).limit(limit);
    },
    getTopDiscounted() {
        return Product.find({ outofstock: false, discount: { $lt: -10 } })
            .sort({ discount: 1 })
            .limit(12);
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
    getSearchResults(query, category) {
        let filter = {};

        if (query) {
            const searchRegex = new RegExp(query, "i");
            filter.$or = [{ title: searchRegex }, { category: searchRegex }];
        }

        if (category && category !== "all") {
            filter.category = category.toLowerCase();
        }

        return Product.find(filter).select({
            title: 1,
            category: 1,
            newPrice: 1,
            "images.gallery": { $slice: 2 },
        });
    },
    getProductsCategory() {
        return Product.find().distinct("category");
    },
};
