// src/server.ts
import { createServer } from "http";

// src/exec-req/exec.ts
var exec = ({ handler, req, res, params, data, throwError }) => {
  try {
    handler({ req, res, params, data, throwError });
  } catch (error) {
    if (error.message === "USER_ERROR") {
      if (res.statusCode === 200) {
        res.statusCode = 500;
      }
    }
    res.end();
  }
};

// src/utils/findHandler.ts
import { resolve } from "path";
var findHandler = async ({ method, config, path }) => {
  const fileEnding = config.typescript ? ".ts" : ".js";
  const lowerCaseMethod = method.toLowerCase();
  if (path[path.length - 1] !== "/") {
    path = `${path}/`;
  }
  const modulePath = `${resolve("./")}${config.routesPath}${path}index${fileEnding}`;
  try {
    const module = await import(modulePath);
    const handler = module[lowerCaseMethod];
    return handler;
  } catch (error) {
    return void 0;
  }
};

// src/utils/dataparser.ts
var dataParser = async ({ req, throwError, rawData }) => {
  let data;
  if (rawData.length > 1e6) {
    throwError({
      errorMessage: "Request entity too large",
      statusCode: 413
    });
    return;
  }
  switch (req.headers["content-type"]) {
    case "application/json": {
      data = JSON.parse(rawData.toString());
      break;
    }
    case "application/x-www-form-urlencoded": {
      data = new URLSearchParams(rawData.toString());
      break;
    }
    default: {
      throwError({
        errorMessage: "Unsupported content type",
        statusCode: 415
      });
    }
  }
  return data;
};

// src/exec-req/execReq.ts
var execReq = async ({
  config,
  method,
  path,
  req,
  res,
  params,
  throwError
}) => {
  try {
    const handler = await findHandler({ method, config, path });
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
      throwError
    };
    setTimeout(() => {
      res.statusCode = 408;
      res.end();
    }, config.timeout || 3e3);
    if (method !== "GET") {
      req.on("data", async (rawData) => {
        const data = await dataParser({ req, throwError, rawData });
        exec({ ...execParams, data });
      });
    } else {
      exec(execParams);
    }
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      res.statusCode = 404;
      res.end();
    } else {
      console.error(error);
      res.statusCode = 500;
      res.end();
    }
  }
};

// src/utils/cors.ts
var cors = async ({ res, cors: cors2 }) => {
  const entries = Object.entries(cors2);
  for (let [key, value] of entries) {
    const capitalizedKey = `${key[0].toUpperCase()}${key.slice(1)}`;
    if (Array.isArray(value)) {
      value = value.join(", ");
    }
    res.setHeader(`Access-Control-Allow-${capitalizedKey}`, value);
  }
};

// src/utils/logger.ts
var logger = ({ req, res, errors }) => {
  res.on("finish", () => {
    const date = (/* @__PURE__ */ new Date()).toLocaleString();
    const method = req.method;
    const path = req.url;
    let statusCodeBG;
    if (res.statusCode >= 200 && res.statusCode < 300) {
      statusCodeBG = "\x1B[42;30m";
    }
    if (res.statusCode >= 300 && res.statusCode < 400) {
      statusCodeBG = "\x1B[46;30m";
    }
    if (res.statusCode >= 400 && res.statusCode < 500) {
      statusCodeBG = "\x1B[43;30m";
    }
    if (res.statusCode >= 500) {
      statusCodeBG = "\x1B[41;30m";
    }
    console.log(
      `Request: \x1B[36m${method}\x1B[0m \x1B[35m${path}\x1B[0m ${statusCodeBG}${res.statusCode}\x1B[0m \x1B[32m${date}\x1B[0m`
    );
    if (errors.length > 0) {
      console.log(`Errors (${errors.length}):`);
      console.log(`\x1B[31m${errors.join("\n")}\x1B[0m`);
    }
  });
};

// src/utils/pathAndParams.ts
var pathAndParams = ({ url, res }) => {
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
        enumerable: true
      });
    }
  }
  return { path: path || "/", params };
};

// src/utils/findConfig.ts
import { readFile } from "node:fs/promises";
var CONFIG_FILE_NAME = "perstorp.config.json";
var findConfig = async () => {
  try {
    const data = await readFile(process.cwd() + "/" + CONFIG_FILE_NAME, {
      encoding: "utf-8"
    });
    const config = JSON.parse(data);
    return config;
  } catch (error) {
    return null;
  }
};

// src/server.ts
var perstorp = (context) => {
  return createServer(async function(req, res) {
    const errors = [];
    const throwError = ({ errorMessage, statusCode }) => {
      res.statusCode = statusCode;
      errors.push(errorMessage);
      throw new Error("USER_ERROR");
    };
    const pathAndArrays = pathAndParams({ url: req.url, res });
    const { path, params } = pathAndArrays;
    const config = await findConfig();
    if (!config) {
      errors.push("No perstorp.config file found");
      res.statusCode = 500;
      res.end();
      logger({ req, res, errors });
      return;
    }
    Object.assign(res, {
      json: (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      }
    });
    cors({ res, cors: config.cors });
    execReq({
      config,
      path,
      req,
      res,
      params,
      throwError,
      method: req.method,
      context
    });
    if (config.logger) {
      logger({ req, res, errors });
    }
  });
};

// src/index.ts
var src_default = perstorp;
export {
  src_default as default
};
