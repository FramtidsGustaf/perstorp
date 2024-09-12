import { perstorp } from "./server";
import {
	Req,
	Res,
	Cors,
	HTTPMethod,
	ReqHandler,
	PerstorpConfig,
} from "./types";

export default perstorp;

export type { Req, Res, Cors, HTTPMethod, ReqHandler, PerstorpConfig };
