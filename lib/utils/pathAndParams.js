"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathAndParams = void 0;
//This function is used to extract the path and params from a given url
const pathAndParams = ({ url, res }) => {
    const [path, query] = url.split("?");
    const params = {};
    if (query) {
        const paramsArray = query.split("&");
        for (const param of paramsArray) {
            const [key, value] = param.split("=");
            if (value.includes("$")) {
                res.statusCode = 400;
                res.end();
            }
            Object.defineProperty(params, key, {
                value,
                writable: false,
                enumerable: true,
            });
        }
    }
    return { path: path || "/", params };
};
exports.pathAndParams = pathAndParams;
