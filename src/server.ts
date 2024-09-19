import { createServer } from "http";
import { execReq } from "./exec-req/execReq";

import type {
	Req,
	Res,
	ThrowError,
	Perstorp,
	HTTPMethod,
	PerstorpFunction,
} from "./types";

import { cors } from "./utils/cors";
import { logger } from "./utils/logger";
import { pathAndParams } from "./utils/pathAndParams";
import { findConfig } from "./utils/findConfig";

/**
 * This function creates a server that listens for incoming requests and executes the appropriate handler based on the request method and path.
 */
export const perstorp: PerstorpFunction = (context?) => {
	return createServer(async function (req: Req, res: Res) {
		const errors: string[] = [];

		const throwError: ThrowError = ({ errorMessage, statusCode }) => {
			res.statusCode = statusCode;
			errors.push(errorMessage);
			throw new Error("USER_ERROR");
		};

		const pathAndArrays = pathAndParams({ url: req.url as string, res });

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
			json: (data: any) => {
				res.setHeader("Content-Type", "application/json");
				res.end(JSON.stringify(data));
			},
		});

		cors({ res, cors: config.cors });

		execReq({
			config,
			path,
			req,
			res,
			params,
			throwError,
			method: req.method as HTTPMethod,
			context,
		});

		if (config.logger) {
			logger({ req, res, errors });
		}
	} as any) as Perstorp;
};
