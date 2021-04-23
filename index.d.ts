// Type definitions for express-ws 3.0
// Project: https://github.com/HenningM/express-ws
// Definitions by: AJ Livingston <https://github.com/ajliv>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
//
// Forked from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-ws/index.d.ts

import * as core from 'express-serve-static-core';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as ws from 'ws';

declare module 'express' {
    function Router(options?: RouterOptions): expressWs.Router;
}

interface wsWithSendJSON extends ws {
    /**
     * Send JSON data to the client
     * 
     * @param data The data to be sent to the client
     */
    sendJSON(data: Record<string, any>): void
  }

declare function expressWs(app: express.Application, server?: http.Server | https.Server, options?: expressWs.Options): expressWs.Instance;


declare module '@devfolioco/express-ws' {
/**
 * Patch an Express Router to add the `ws` method to it
 * 
 * @note This function needs to be called at the start of every router
 * 
 * @param params 
 * 
 * @example
 * ```
 * import { Router } from 'express';
 * import { addWsMethod } from '@devfolioco/express-ws';
 * 
 * addWsMethod(Router)
 * ```
 */
export function addWsMethod(params:express.Router): void
}

declare namespace expressWs {
    type Application = express.Application & WithWebsocketMethod;
    type Router = express.Router & WithWebsocketMethod;

    interface Options {
        leaveRouterUntouched?: boolean;
        wsOptions?: ws.ServerOptions;
    }

    interface RouterLike {
        get: express.IRouterMatcher<this>;
        [key: string]: any;
        [key: number]: any;
    }

    interface Instance {
        app: Application;
        applyTo(target: RouterLike): void;
        getWss(): ws.Server;
    }

    type WebsocketRequestHandler = (ws: wsWithSendJSON, req: express.Request, next: express.NextFunction) => void;
    type WebsocketMethod<T> = (route: core.PathParams, ...middlewares: WebsocketRequestHandler[]) => T;

    interface WithWebsocketMethod {
        ws: WebsocketMethod<this>;
    }
}

export = expressWs;