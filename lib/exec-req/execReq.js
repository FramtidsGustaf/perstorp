"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execReq = void 0;
const exec_1 = require("./exec");
const findHandler_1 = require("../utils/findHandler");
const dataparser_1 = require("../utils/dataparser");
const execReq = async ({ config, method, path, req, res, params, throwError, }) => {
    try {
        const handler = await (0, findHandler_1.findHandler)({ method, config, path });
        if (!handler) {
            res.statusCode = 404;
            res.end();
            return;
        }
        const execParams = {
            handler,
            req,
            res,
            params,
            throwError,
        };
        setTimeout(() => {
            res.statusCode = 408;
            res.end();
        }, config.default.timeout || 3000);
        if (method !== "GET") {
            req.on("data", async (rawData) => {
                const data = await (0, dataparser_1.dataParser)({ req, throwError, rawData });
                (0, exec_1.exec)({ ...execParams, data });
            });
        }
        else {
            (0, exec_1.exec)(execParams);
        }
    }
    catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
            res.statusCode = 404;
            res.end();
        }
        else {
            console.error(error);
            res.statusCode = 500;
            res.end();
        }
    }
};
exports.execReq = execReq;
