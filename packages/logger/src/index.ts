import pino from 'pino';

export interface LoggerOptions {
    level: string;
}

export const createLogger = (options: LoggerOptions) => {
    return pino({
        level: options.level,
        transport: {
            target: 'pino-pretty',
            options: {
                ignore: 'pid,hostname',
            },
        },
    });
};
