"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHandler = void 0;
const path_1 = require("path");
//This function is used to find the handler for a given path and method
const findHandler = async ({ method, config, path }) => {
    const fileEnding = config.typescript ? ".ts" : ".js";
    const lowerCaseMethod = method.toLowerCase();
    const modulePath = `${(0, path_1.resolve)("./")}${config.default.routesPath}${path}/index${fileEnding}`;
    try {
        const module = await import(modulePath);
        const handler = module[lowerCaseMethod];
        return handler;
    }
    catch (error) {
        return undefined;
    }
};
exports.findHandler = findHandler;
