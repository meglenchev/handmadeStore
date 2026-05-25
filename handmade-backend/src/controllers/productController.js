import { Router } from "express";
import productServices from "../services/productServices.js";

export const productController = Router();

productController.get("/products", async (req, res) => {
    try {
        const products = await productServices.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

productController.get("/products/latest", async (req, res) => {
    try {
        const latestProducts = await productServices.getLatest();
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
