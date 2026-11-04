import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { routes } from "./routes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

try {
    await connectDB();

    console.log("Successfully connected to MDB");
} catch (error) {
    console.error(`Cannot connect to DB: ${error.message}`);
    process.exit(1);
}

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // Позволява приемането на бисквитки
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Success");
});

app.listen(5000, () =>
    console.log("Server is listening on http://localhost:5000..."),
);
