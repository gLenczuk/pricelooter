import { EmptyObject } from '@pricelooter/types';
import { ApplicationConfig } from './config';
import { Request } from 'express';
import { Session, SessionData } from 'express-session';

export interface ControllerRequest<T = EmptyObject> {
    body: T;
    session: ServerSession;
    config: ApplicationConfig;
}

export interface TypedExpressRequest<T> extends Request {
    body: T;
}

export type ExtendedExpressSession = Session & Partial<SessionData> & ServerSession;

export interface ServerSession {
    user?: {
        id: number;
    };
}
