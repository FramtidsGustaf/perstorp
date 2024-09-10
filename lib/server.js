"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.perstorp = void 0;
const http_1 = require("http");
const execReq_1 = require("./exec-req/execReq");
const cors_1 = require("./utils/cors");
const logger_1 = require("./utils/logger");
const pathAndParams_1 = require("./utils/pathAndParams");
const findConfig_1 = require("./utils/findConfig");
/**
 * This function creates a server that listens for incoming requests and executes the appropriate handler based on the request method and path.
 */
const perstorp = () => {
    return (0, http_1.createServer)(async function (req, res) {
        const errors = [];
        const throwError = ({ errorMessage, statusCode }) => {
            res.statusCode = statusCode;
            errors.push(errorMessage);
            throw new Error("USER_ERROR");
        };
        const pathAndArrays = (0, pathAndParams_1.pathAndParams)({ url: req.url, res });
        const { path, params } = pathAndArrays;
        const config = await (0, findConfig_1.findConfig)();
        if (!config) {
            errors.push("No boom.config file found");
            res.statusCode = 500;
            res.end();
            (0, logger_1.logger)({ req, res, errors });
            return;
        }
        Object.assign(res, {
            json: (data) => {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
            },
        });
        (0, cors_1.cors)({ res, cors: config.cors });
        (0, execReq_1.execReq)({
            config,
            path,
            req,
            res,
            params,
            throwError,
            method: req.method,
        });
        if (config.logger) {
            (0, logger_1.logger)({ req, res, errors });
        }
    });
};
exports.perstorp = perstorp;
