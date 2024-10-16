import { IncomingMessage, Server, ServerResponse } from "http";

export type Req = IncomingMessage;

export interface Res extends ServerResponse<IncomingMessage> {
  json: (data: { [key: string]: string }) => void;
}

export type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS";

export type Perstorp = Server<typeof IncomingMessage, typeof ServerResponse>;

export interface Params {
  [key: string]: string;
}

export type ThrowError = ({
  errorMessage,
  statusCode,
}: {
  errorMessage: string;
  statusCode: number;
}) => void;

export type ReqHandler = (props: {
  req: Req;
  res: Res;
  params: Params;
  data?: any;
  throwError: ThrowError;
}) => void;

export type Cors = {
  origin: string;
  methods: HTTPMethod[];
  headers: string[];
};

export interface PerstorpConfig {
  routesPath: string;
  cors: Cors;
  timeout?: number;
  logger?: boolean;
  typescript?: boolean;
}

export interface Context {
  [key: string]: any;
}

export interface PerstorpFunction {
  (context?: Context): Perstorp;
}
