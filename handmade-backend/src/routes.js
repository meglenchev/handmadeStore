import { Router } from "express";
import { productController } from "./controllers/productController.js";

export const routes = Router();

routes.use(productController);
routes.use("/*splat", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});
