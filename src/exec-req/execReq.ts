import { exec } from "./exec";
import { findHandler } from "../utils/findHandler";
import { dataParser } from "../utils/dataparser";
import type { ExecParams, ExecReq } from "./types";

export const execReq: ExecReq = async ({
	config,
	method,
	path,
	req,
	res,
	params,
	throwError,
}) => {
	try {
		const handler = await findHandler({ method, config, path });

		if (!handler) {
			res.statusCode = 404;
			res.end();
			return;
		}

		const execParams: ExecParams = {
			handler,
			req,
			res,
			params,
			throwError,
		};

		setTimeout(() => {
			res.statusCode = 408;
			res.end();
		}, config.timeout || 3000);

		if (method !== "GET") {
			req.on("data", async (rawData: any) => {
				const data = await dataParser({ req, throwError, rawData });
				exec({ ...execParams, data });
			});
		} else {
			exec(execParams);
		}
	} catch (error: any) {
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
