import "dotenv/config";
import mongoose from "mongoose";
import { pathToFileURL } from "node:url";
import { products } from "./data/products.js";
import { Product } from "./models/Product.js";
import { User } from "./models/User.js";
import { slugify } from "./utils/slugify.js";

// Същото име на базата като в index.js, за да добавяме в базата, която сървърът ползва.
const DB_NAME = "handmade-shop";

// Само за локална разработка - очевидно тестова парола, обща за всички seed потребители.
export const SEED_PASSWORD = "Password123!";

export function buildUsers() {
    return [
        {
            fullName: "Тестов Администратор",
            username: "admin",
            email: "admin@handmade.test",
            password: SEED_PASSWORD,
            role: "admin",
        },
        {
            fullName: "Тестов Продавач",
            username: "vendor",
            email: "vendor@handmade.test",
            password: SEED_PASSWORD,
            role: "user",
            vendorStatus: "approved",
            phone: "+359 888 123 456",
            address: [
                {
                    recipientName: "Тестов Продавач",
                    phone: "+359 888 123 456",
                    country: "България",
                    city: "София",
                    postalCode: "1000",
                    addressLine1: "ул. Тестова 1",
                    isDefault: true,
                },
                {
                    recipientName: "Тестов Продавач",
                    phone: "+359 888 123 456",
                    country: "България",
                    city: "Пловдив",
                    postalCode: "4000",
                    addressLine1: "ул. Примерна 2",
                    isDefault: false,
                },
            ],
        },
        {
            fullName: "Тестов Клиент",
            username: "customer",
            email: "customer@handmade.test",
            password: SEED_PASSWORD,
            role: "user",
        },
    ];
}

export function buildProducts(vendorId) {
    const usedSlugs = new Set();

    return products.map((product) => {
        // Slug-ът се задава тук, защото insertMany() не пуска pre("save") хука на модела.
        const base = slugify(product.title);
        let slug = base;
        for (let i = 1; usedSlugs.has(slug); i++) {
            slug = `${base}-${i}`;
        }
        usedSlugs.add(slug);

        return {
            ...product,
            slug,
            // Стара цена има смисъл само ако е по-висока от новата (иначе няма отстъпка).
            oldPrice:
                product.oldPrice > product.newPrice ? product.oldPrice : null,
            vendor: vendorId,
        };
    });
}

async function seedDatabase() {
    if (process.env.NODE_ENV === "production") {
        throw new Error("Refusing to seed: NODE_ENV is 'production'.");
    }

    const url = process.env.MONGODB_URI;
    if (!url) {
        throw new Error(
            "MONGODB_URI is not set. Add it to handmade-backend/.env, e.g. MONGODB_URI=mongodb://localhost:27017/handmade-shop",
        );
    }

    await mongoose.connect(url, {
        dbName: DB_NAME,
        serverSelectionTimeoutMS: 5000,
    });
    console.log(
        `Connected to MongoDB: ${mongoose.connection.host}/${mongoose.connection.name}`,
    );

    // Гарантира, че unique индексите съществуват, преди да засяваме.
    await Promise.all([User.init(), Product.init()]);

    const users = buildUsers();

    // Трием само seed потребителите, за да не изчезнат ръчно регистрираните.
    await User.deleteMany({
        $or: [
            { email: { $in: users.map((u) => u.email) } },
            { username: { $in: users.map((u) => u.username) } },
        ],
    });
    // Внимание: трие ВСИЧКИ продукти (и ръчно добавените), за да се строи slug индексът върху празна колекция.
    await Product.deleteMany({});
    console.log("Existing products and seed users deleted.");

    // create() пуска pre("save") хука, който хешира паролата - НЕ хеширай ръчно.
    const createdUsers = await User.create(users);
    console.log(`Seeded ${createdUsers.length} users.`);

    const vendor = createdUsers.find((u) => u.vendorStatus === "approved");
    const createdProducts = await Product.insertMany(buildProducts(vendor._id));
    console.log(`Seeded ${createdProducts.length} products.`);

    console.log("\nSeed акаунти (входът е с ИМЕЙЛ):");
    for (const u of users) {
        console.log(`  ${u.role ?? "user"} | ${u.email} | ${SEED_PASSWORD}`);
    }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        await seedDatabase();
        console.log("\nSeeding finished successfully.");
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB.");
        }
    }
}
