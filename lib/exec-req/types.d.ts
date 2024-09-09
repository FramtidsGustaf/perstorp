import type { ReqHandler, Req, Res, Params, ThrowError, HTTPMethod } from "../types.ts";
export type ExecParams = {
    handler: ReqHandler;
    req: Req;
    res: Res;
    params: Params;
    data?: any;
    throwError: ThrowError;
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
};
export type ExecReq = (params: ExecReqParams) => void;
export {};
