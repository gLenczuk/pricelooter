export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<string, never>;

export enum NodeEnv {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRODUCTION = 'production',
}

export * from './error';
export * from './http';

export * from './domain/user';
export * from './domain/session';
export * from './domain/token';
export * from './domain/notification';
export * from './domain/platform';
export * from './domain/product';
