import { Router } from "express";
import localityServices from "../services/localityServices.js";

export const localityController = Router();

localityController.get("/localities/search", async (req, res, next) => {
    try {
        const { query, country } = req.query;
        const localities = await localityServices.searchLocalities(
            query,
            country,
        );

        res.set("Cache-Control", "public, max-age=3600");
        res.json(localities);
    } catch (err) {
        next(err);
    }
});
