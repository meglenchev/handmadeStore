import { Router } from "express";
import { productController } from "./controllers/productController.js";
import { userController } from "./controllers/userController.js";
import { localityController } from "./controllers/localityController.js";

export const routes = Router();

routes.use(productController);
routes.use(userController);
routes.use(localityController);
routes.use("/*splat", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});
