import { Schema, model } from "mongoose";
import { SHIPPING_COUNTRIES } from "../config/shipping.js";

const localitySchema = new Schema(
    {
        // '00702'; null за чужди държави
        ekatte: {
            type: String,
            unique: true,
            sparse: true,
        },
        // 'BG'
        country: {
            type: String,
            required: true,
            enum: SHIPPING_COUNTRIES,
        },
        // 'гр.' или 'с.'
        type: {
            type: String,
            enum: ["гр.", "с."],
            required: true,
        },
        // 'Асеновград'
        name: {
            type: String,
            required: true,
        },
        // 'Asenovgrad'
        nameLatin: {
            type: String,
        },
        // 'Пловдив'
        region: {
            type: String,
        },
        // 'Асеновград'
        municipality: {
            type: String,
        },
        // '4230'
        postCode: {
            type: String,
        },
        // Еконт, Спиди и т.н. идентификатори на населеното място в куриерските системи
        courierIds: {
            econt: {
                type: Number,
                default: null,
            },
            speedy: {
                type: Number,
                default: null,
            },
        },
        // нормализирано: 'асеновград|asenovgrad'
        searchTerms: {
            type: [String],
            required: true,
            index: true,
        },
    },
    { timestamps: true },
);

localitySchema.index({ country: 1, search: 1 });

export const Locality = model("Locality", localitySchema, "localities");
