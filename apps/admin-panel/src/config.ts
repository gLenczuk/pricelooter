import { NodeEnv } from '@pricelooter/types';

export interface ApplicationConfig {
    NODE_ENV: NodeEnv;
    LOGGER_LEVEL: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    ADMIN_PORT: number;
    SESSION_SECRET: string;
}

export const getApplicationConfig = (): ApplicationConfig => ({
    NODE_ENV: (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.DEVELOPMENT,
    LOGGER_LEVEL: process.env.LOGGER_LEVEL ?? 'info',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'root',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'root',
    ADMIN_PORT: Number(process.env.ADMIN_PORT) ?? 5000,
    SESSION_SECRET: process.env.SESSION_SECRET ?? 'cat_on_keyboard',
});
