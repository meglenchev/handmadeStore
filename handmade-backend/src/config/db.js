import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://localhost:27017/handmade-shop";

export async function connectDB() {
    const uri = process.env.MONGODB_URI || DEFAULT_URI;
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
    return mongoose.connection;
}

export function disconnectDB() {
    return mongoose.disconnect();
}
