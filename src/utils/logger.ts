import type { Logger } from "./types";

// This function is used to log activity on the server in a nice format
export const logger: Logger = ({ req, res, errors }) => {
	res.on("finish", () => {
		const date = new Date().toLocaleString();
		const method = req.method;
		const path = req.url;

		let statusCodeBG: string;

		if (res.statusCode >= 200 && res.statusCode < 300) {
			statusCodeBG = "\x1b[42;30m";
		}

		if (res.statusCode >= 300 && res.statusCode < 400) {
			statusCodeBG = "\x1b[46;30m";
		}

		if (res.statusCode >= 400 && res.statusCode < 500) {
			statusCodeBG = "\x1b[43;30m";
		}

		if (res.statusCode >= 500) {
			statusCodeBG = "\x1b[41;30m";
		}

		console.log(
			`Request: \x1b[36m${method}\x1b[0m \x1b[35m${path}\x1b[0m ${statusCodeBG!}${
				res.statusCode
			}\x1b[0m \x1b[32m${date}\x1b[0m`
		);
		if (errors.length > 0) {
			console.log(`Errors (${errors.length}):`);
			console.log(`\x1b[31m${errors.join("\n")}\x1b[0m`);
		}
	});
};
