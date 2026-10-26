// TODO(slug): при create/update на продукт използвай saveWithUniqueSlug(doc),
// НЕ product.save(). Изисква auth да е готов преди да заключиш mutations.

import { Router } from "express";
import productServices from "../services/productServices.js";

export const productController = Router();

const MAX_LATEST_LIMIT = 50;
const MAX_CART_PRODUCTS = 50;

productController.get("/products", async (req, res, next) => {
    try {
        const { tag, category, code, sort, max_price } = req.query;
        const products = await productServices.getAll({
            tag,
            category,
            code,
            sort,
            max_price,
        });
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
});

productController.get("/products/latest", async (req, res, next) => {
    try {
        const category = req.query.category;
        const limit = Math.min(
            Math.max(parseInt(req.query.limit) || 6, 1),
            MAX_LATEST_LIMIT,
        );
        const latestProducts = await productServices.getLatest(category, limit);
        res.json(latestProducts);
    } catch (err) {
        next(err);
    }
});

productController.get(
    "/products/:productId/details",
    async (req, res, next) => {
        const productId = req.params.productId;

        try {
            const product = await productServices.getOne(productId);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            res.json(product);
        } catch (err) {
            console.error("Error fetching product details:", err);

            // Error due to invalid ID format for MongoDB
            if (err.name === "CastError") {
                return res
                    .status(400)
                    .json({ message: "Invalid Product ID format" });
            }

            // Error due to any other unexpected issues (server-side)
            next(err);
        }
    },
);

productController.get("/products/discounted", async (req, res, next) => {
    try {
        const discountedProducts = await productServices.getTopDiscounted();
        res.json(discountedProducts);
    } catch (err) {
        next(err);
    }
});

productController.get("/products/special", async (req, res, next) => {
    try {
        const specialProducts = await productServices.getSpecialProducts();
        res.json(specialProducts);
    } catch (err) {
        next(err);
    }
});

productController.post("/products/check", async (req, res, next) => {
    try {
        const { productIds } = req.body ?? {};
        if (
            !Array.isArray(productIds) ||
            productIds.length === 0 ||
            productIds.length > MAX_CART_PRODUCTS ||
            productIds.some((id) => typeof id !== "string")
        ) {
            return res.status(400).json({
                message: `Product IDs must be an array of 1 to ${MAX_CART_PRODUCTS} strings`,
            });
        }

        const cartProducts = await productServices.getCartProducts(productIds);
        res.json(cartProducts);
    } catch (err) {
        // Error due to invalid ID format for MongoDB
        if (err.name === "CastError") {
            return res
                .status(400)
                .json({ message: "Invalid Product ID format" });
        }

        next(err);
    }
});

productController.get("/products/search", async (req, res, next) => {
    try {
        const { query, category } = req.query;
        const searchResults = await productServices.getSearchResults(
            query,
            category,
        );
        res.status(200).json(searchResults);
    } catch (err) {
        next(err);
    }
});

productController.get("/products/categories", async (req, res, next) => {
    try {
        const categories = await productServices.getProductsCategory();
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
});

// TODO(slug): при create/update на продукт използвай saveWithUniqueSlug(doc),
// НЕ product.save(). Изисква auth да е готов преди да заключиш mutations.
