import { readFile } from "node:fs/promises";
import type { PerstorpConfig } from "../types";

const CONFIG_FILE_NAME = "perstorp.config.json";

//This function is used to find the config file in the current working directory
export const findConfig = async (): Promise<PerstorpConfig | null> => {
	try {
		const data = await readFile(process.cwd() + "/" + CONFIG_FILE_NAME, {
			encoding: "utf-8",
		});

		const config = JSON.parse(data);

		return config;
	} catch (error) {
		return null;
	}
};
