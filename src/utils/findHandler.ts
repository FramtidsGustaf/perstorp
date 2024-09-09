import { resolve } from "path";
import type { ReqHandler } from "../types.d.ts";
import type { FindHandler } from "./types.d.ts";

//This function is used to find the handler for a given path and method
export const findHandler: FindHandler = async ({ method, config, path }) => {
	const fileEnding = config.typescript ? ".ts" : ".js";
	const lowerCaseMethod = method.toLowerCase();
	const modulePath = `${resolve("./")}${
		config.default.routesPath
	}${path}/index${fileEnding}`;

	try {
		const module = await import(modulePath);
		const handler: ReqHandler | undefined = module[lowerCaseMethod];
		return handler;
	} catch (error: any) {
		return undefined;
	}
};
