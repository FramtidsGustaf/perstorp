import { IncomingMessage, ServerResponse, Server } from 'http';

type Req = IncomingMessage;
interface Res extends ServerResponse<IncomingMessage> {
    json: (data: {
        [key: string]: string;
    }) => void;
}
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
type Perstorp = Server<typeof IncomingMessage, typeof ServerResponse>;
interface Params {
    [key: string]: string;
}
type ThrowError = ({ errorMessage, statusCode, }: {
    errorMessage: string;
    statusCode: number;
}) => void;
type ReqHandler = (props: {
    req: Req;
    res: Res;
    params: Params;
    data?: any;
    throwError: ThrowError;
}) => void;
type Cors = {
    origin: string;
    methods: HTTPMethod[];
    headers: string[];
};
interface PerstorpConfig {
    routesPath: string;
    cors: Cors;
    timeout?: number;
    logger?: boolean;
    typescript?: boolean;
}
interface Context {
    [key: string]: any;
}
interface PerstorpFunction {
    (context?: Context): Perstorp;
}

/**
 * This function creates a server that listens for incoming requests and executes the appropriate handler based on the request method and path.
 */
declare const perstorp: PerstorpFunction;

export { type Cors, type HTTPMethod, type PerstorpConfig, type Req, type ReqHandler, type Res, perstorp as default };
