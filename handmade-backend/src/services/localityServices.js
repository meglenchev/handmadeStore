import { Locality } from "../models/Locality.js";
import { SHIPPING_COUNTRIES } from "../config/shipping.js";
import { escapeRegex } from "../utils/escapeRegex.js";

const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 15;

export default {
    searchLocalities(query, country) {
        const cleanQuery =
            typeof query === "string"
                ? query.trim().toLowerCase().slice(0, 50)
                : "";
        const cleanCountry =
            typeof country === "string" ? country.trim().toUpperCase() : "";

        if (
            cleanQuery.length < MIN_QUERY_LENGTH ||
            !SHIPPING_COUNTRIES.includes(cleanCountry)
        ) {
            return [];
        }

        return Locality.find({
            country: cleanCountry,
            searchTerms: { $regex: `^${escapeRegex(cleanQuery)}` },
        })
            .select({
                type: 1,
                name: 1,
                region: 1,
                municipality: 1,
                postCode: 1,
            })
            .sort({ type: 1, name: 1 })
            .limit(MAX_RESULTS)
            .lean();
    },
    getLocalityById(localityId, country = "BG") {
        if (!isValidObjectId(localityId)) {
            return null;
        }

        return Locality.findOne({ _id: localityId, country }).lean();
    },
};
