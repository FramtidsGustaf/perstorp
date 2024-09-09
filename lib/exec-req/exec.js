"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const exec = ({ handler, req, res, params, data, throwError }) => {
    try {
        handler({ req, res, params, data, throwError });
    }
    catch (error) {
        if (error.message === "USER_ERROR") {
            if (res.statusCode === 200) {
                res.statusCode = 500;
            }
        }
        res.end();
    }
};
exports.exec = exec;
