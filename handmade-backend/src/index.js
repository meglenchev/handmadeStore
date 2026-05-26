import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routes } from "./routes.js";

const app = express();

const url = "mongodb://localhost:27017/handmade-shop";

try {
    await mongoose.connect(url, {
        dbName: "handmade-shop",
    });

    console.log("Successfully conntected to MDB");
} catch (error) {
    console.log(`Cannot connect to DB ${error.message}`);
}

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // Позволява приемането на бисквитки
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.get("/", (req, res) => {
    res.send("Success");
});

app.listen(5000, () =>
    console.log("Server is listening on http://localhost:5000..."),
);
