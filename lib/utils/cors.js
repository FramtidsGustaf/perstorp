"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
// This function takes the CORS settings from the config and applies it on the headers on the response object.
const cors = async ({ res, cors }) => {
    const entries = Object.entries(cors);
    for (let [key, value] of entries) {
        const capitalizedKey = `${key[0].toUpperCase()}${key.slice(1)}`;
        if (Array.isArray(value)) {
            value = value.join(", ");
        }
        res.setHeader(`Access-Control-Allow-${capitalizedKey}`, value);
    }
};
exports.cors = cors;
