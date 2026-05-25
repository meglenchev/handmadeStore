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
    getLatest() {
        return Product.find().sort({ createdAt: -1 }).limit(6);
    },
};
