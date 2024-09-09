"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConfig = void 0;
const CONFIG_FILE_NAME = "perstorp.config.json";
//This function is used to find the config file in the current working directory
const findConfig = async () => {
    try {
        const config = import(process.cwd() + "/" + CONFIG_FILE_NAME, {
            with: { type: "json" },
        });
        return config;
    }
    catch (error) {
        return null;
    }
};
exports.findConfig = findConfig;
