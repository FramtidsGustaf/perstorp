import type { BoomServer } from "./types";
/**
 * This function creates a server that listens for incoming requests and executes the appropriate handler based on the request method and path.
 */
export declare const boomServer: () => BoomServer;
