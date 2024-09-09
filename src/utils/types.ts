import type {
	Res,
	Cors,
	Req,
	ThrowError,
	HTTPMethod,
	ReqHandler,
} from "../types.ts";

export type CorsFunc = (params: { res: Res; cors: Cors }) => void;

export type DataParser = (params: {
	req: Req;
	throwError: ThrowError;
	rawData: Buffer;
}) => Promise<any>;

export type FindHandler = (params: {
	method: HTTPMethod;
	config: any;
	path: string;
}) => Promise<ReqHandler | undefined>;

export type Logger = (params: { req: Req; res: Res; errors: string[] }) => void;

export type PathAndParams = (params: { url: string; res: Res }) => {
	path: string;
	params: any;
};
