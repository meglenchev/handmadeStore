import { Router } from "express";
import productServices from "../services/productServices.js";

export const productController = Router();

productController.get("/products", async (req, res) => {
    try {
        const { tag, category, code } = req.query;
        const products = await productServices.getAll({
            tag,
            category,
            code,
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

productController.get("/products/latest", async (req, res) => {
    try {
        const category = req.query.category;
        const limit = parseInt(req.query.limit) || 6;
        const latestProducts = await productServices.getLatest(category, limit);
        res.json(latestProducts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

productController.get("/products/:productId/details", async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await productServices.getOne(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product details:", error);

        // Error due to invalid ID format for MongoDB
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid Product ID format",
                error: error.message,
            });
        }

        // Error due to any other unexpected issues (server-side)
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

productController.get("/products/discounted", async (req, res) => {
    try {
        const discountedProducts = await productServices.getTopDiscounted();
        res.json(discountedProducts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

productController.get("/products/special", async (req, res) => {
    try {
        const specialProducts = await productServices.getSpecialProducts();
        res.json(specialProducts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

productController.post("/products/check", async (req, res) => {
    try {
        const { productIds } = req.body;
        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({
                message: "Product IDs must be a non-empty array",
            });
        }

        const cartProducts = await productServices.getCartProducts(productIds);
        res.json(cartProducts);
    } catch (error) {
        // Error due to invalid ID format for MongoDB
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid Product ID format",
                error: error.message,
            });
        }

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

productController.get("/products/search", async (req, res) => {
    try {
        const { query, category } = req.query;
        const searchResults = await productServices.getSearchResults(
            query,
            category,
        );
        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
