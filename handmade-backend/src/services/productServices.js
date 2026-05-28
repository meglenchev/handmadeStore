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
        ]);
    },
};
