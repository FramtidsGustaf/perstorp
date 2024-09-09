import type { PathAndParams } from "./types";

//This function is used to extract the path and params from a given url
export const pathAndParams: PathAndParams = ({ url, res }) => {
	const [path, query] = url.split("?");
	const params = {};

	if (query) {
		const paramsArray = query.split("&");

		for (const param of paramsArray) {
			const [key, value] = param.split("=") as [string, string];

			if (value.includes("$")) {
				res.statusCode = 400;
				res.end();
			}

			Object.defineProperty(params, key, {
				value,
				writable: false,
				enumerable: true,
			});
		}
	}

	return { path: path || "/", params };
};
