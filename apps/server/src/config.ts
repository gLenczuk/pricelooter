import { NodeEnv } from '@pricelooter/types';

export interface ApplicationConfig {
    NODE_ENV: NodeEnv;
    SERVER_HOST: string;
    SERVER_PORT: number;
    SESSION_SECRET: string;
    CLIENT_URL: string;
    SSL_CERT_PATH: string;
    SSL_KEY_PATH: string;
    LOGGER_LEVEL: string;
    LOG_DETAILED_ERRORS: boolean;
    MAILER_PROVIDER: string;
    MAILER_SENDER_NAME: string;
    MAILER_SENDER_EMAIL: string;
    MAILER_API_KEY: string;
    ENABLE_ACCOUNT_ACTIVATIONS: boolean;
}

export const getApplicationConfig = (): ApplicationConfig => ({
    NODE_ENV: (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.DEVELOPMENT,
    SERVER_HOST: process.env.SERVER_HOST ?? 'localhost',
    SERVER_PORT: Number(process.env.SERVER_PORT) ?? 3000,
    CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:8000',
    SSL_CERT_PATH: process.env.SSL_CERT_PATH ?? '',
    SSL_KEY_PATH: process.env.SSL_KEY_PATH ?? '',
    SESSION_SECRET: process.env.SESSION_SECRET ?? 'cat_on_keyboard',
    LOGGER_LEVEL: process.env.LOGGER_LEVEL ?? 'info',
    MAILER_PROVIDER: process.env.MAILER_PROVIDER ?? 'local',
    MAILER_SENDER_NAME: process.env.MAILER_SENDER_NAME ?? 'pricelooter',
    MAILER_SENDER_EMAIL: process.env.MAILER_SENDER_EMAIL ?? '',
    MAILER_API_KEY: process.env.MAILER_API_KEY ?? '',
    ENABLE_ACCOUNT_ACTIVATIONS: process.env.ENABLE_ACCOUNT_ACTIVATIONS === 'true' ?? false,
    LOG_DETAILED_ERRORS: process.env.LOG_DETAILED_ERRORS === 'true' ?? false,
});
