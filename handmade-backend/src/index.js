import express from "express";
import mongoose from "mongoose";

const url = "mongodb://localhost:27017/handmade-shop";

try {
    await mongoose.connect(url, {
        dbName: "handmade-shop",
    });

    console.log("Successfully conntected to MDB");
} catch (error) {
    console.log(`Cannot connect to DB ${error.message}`);
}

const app = express();

app.get("/", (req, res) => {
    res.send("Success");
});

app.listen(5000, () =>
    console.log("Server is listening on http://localhost:5000..."),
);
