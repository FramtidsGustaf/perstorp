import type {
	ReqHandler,
	Req,
	Res,
	Params,
	ThrowError,
	HTTPMethod,
	Context,
} from "../types.ts";

export type ExecParams = {
	handler: ReqHandler;
	req: Req;
	res: Res;
	params: Params;
	data?: any;
	throwError: ThrowError;
	context?: Context;
};

export type Exec = (params: ExecParams) => void;

type ExecReqParams = {
	config: any;
	method: HTTPMethod;
	path: string;
	req: Req;
	res: Res;
	params: Params;
	throwError: ThrowError;
	context?: Context;
};

export type ExecReq = (params: ExecReqParams) => void;
