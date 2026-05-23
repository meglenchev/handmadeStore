import mongoose from "mongoose";
import { products } from "./data/products.js";
import { Product } from "./models/Product.js";

const url = "mongodb://localhost:27017/handmade-shop";

async function seedDatabase() {
    try {
        await mongoose.connect(url, {
            dbName: "handmade-shop",
        });
        console.log(" Connected to MongoDB for seeding...");

        await Product.deleteMany({});
        console.log("Existing products deleted.");

        await Product.insertMany(products);
        console.log(` Successfully seeded ${products.length} products!`);
    } catch (error) {
        console.error("Error seeding products:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB after seeding.");
    }
}

seedDatabase();
