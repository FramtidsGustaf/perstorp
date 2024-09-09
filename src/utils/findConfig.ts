import type { BoomConfig } from "../types.d.ts";

const CONFIG_FILE_NAME = "perstorp.config.json";

//This function is used to find the config file in the current working directory
export const findConfig = async (): Promise<BoomConfig | null> => {
	try {
		const config = import(process.cwd() + "/" + CONFIG_FILE_NAME, {
			with: { type: "json" },
		});
		return config;
	} catch (error) {
		return null;
	}
};
