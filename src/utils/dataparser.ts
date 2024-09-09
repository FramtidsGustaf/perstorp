import type { DataParser } from "./types.d.ts";

// Data parser function
export const dataParser: DataParser = async ({ req, throwError, rawData }) => {
	let data: any;

	if (rawData.length > 1e6) {
		throwError({
			errorMessage: "Request entity too large",
			statusCode: 413,
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
				statusCode: 415,
			});
		}
	}
	return data;
};
