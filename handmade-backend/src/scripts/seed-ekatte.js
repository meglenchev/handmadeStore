import fs from "node:fs/promises";
import path from "node:path";
import { Locality } from "../models/Locality.js";
import { connectDB, disconnectDB } from "../config/db.js";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const fileArg = args.find((a) => !a.startsWith("--"));
const FILE = path.resolve(fileArg ?? "src/data/ek_atte.json");
const ALLOWED_TYPES = new Set(["гр.", "с."]);

const normalize = (s) => s.trim().toLowerCase();

function toLocality(r) {
    const name = r.name.trim();
    const nameLatin = r.name_en?.trim() || null;

    return {
        ekatte: r.ekatte,
        country: "BG",
        type: r.t_v_m,
        name,
        nameLatin,
        region: r.oblast_name.replace(/^обл\.\s*/, "").trim(),
        municipality: r.obshtina_name.trim(),
        searchTerms: [
            ...new Set([name, nameLatin].filter(Boolean).map(normalize)),
        ],
    };
}

async function loadRows(file) {
    const raw = JSON.parse(await fs.readFile(file, "utf8"));
    if (!Array.isArray(raw)) throw new Error(`Expected array in ${file}`);

    // Последният елемент е метаданни ("Данните са актуални към ...")
    const meta = raw.find((r) => !r.ekatte);
    const rows = raw.filter((r) => r.ekatte && ALLOWED_TYPES.has(r.t_v_m));

    const invalid = rows.filter(
        (r) => !r.name || !r.oblast_name || !r.obshtina_name,
    );
    if (invalid.length) {
        throw new Error(
            `Invalid rows: ${invalid.map((r) => r.ekatte).join(", ")}`,
        );
    }

    return { rows, meta };
}

async function run() {
    const { rows, meta } = await loadRows(FILE);
    const docs = rows.map(toLocality);

    console.log(`File: ${FILE}`);
    if (meta) console.log(`Source meta: ${JSON.stringify(meta)}`);
    console.log(`Localities to upsert: ${docs.length}`);

    if (DRY_RUN) {
        console.log("Dry run, sample:", docs.slice(0, 3));
        return;
    }

    await connectDB();

    try {
        await Locality.syncIndexes();

        // $set само на полетата от ЕКАТТЕ, за да не презаписва
        // postCode/courierIds, попълнени по-късно от куриерите
        const ops = docs.map((doc) => ({
            updateOne: {
                filter: { ekatte: doc.ekatte },
                update: { $set: doc },
                upsert: true,
            },
        }));

        const res = await Locality.bulkWrite(ops, { ordered: false });
        console.log(
            `Done. upserted: ${res.upsertedCount}, modified: ${res.modifiedCount}, matched: ${res.matchedCount}`,
        );

        const total = await Locality.countDocuments({ country: "BG" });
        console.log(`BG localities in DB: ${total}`);
    } finally {
        await disconnectDB();
    }
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
