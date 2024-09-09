import type { Exec } from "./types";

export const exec: Exec = ({ handler, req, res, params, data, throwError }) => {
	try {
		handler({ req, res, params, data, throwError });
	} catch (error: any) {
		if (error.message === "USER_ERROR") {
			if (res.statusCode === 200) {
				res.statusCode = 500;
			}
		}
		res.end();
	}
};
