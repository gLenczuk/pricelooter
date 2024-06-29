import express, { Router } from 'express';
import morgan from 'morgan-body';
import helmet from 'helmet';
import cors from 'cors';
import { ApplicationConfig } from './config';
import { NodeEnv } from '@pricelooter/types';
import { withHttpErrorHandler, withNotFoundErrorHandler } from './middlewares/withErrorHandler';
import { createSessionStore } from './libs/session-store';

export interface ApplicationDependencies {
    routers: Router[];
    config: ApplicationConfig;
}

export const createApplication = (dependencies: ApplicationDependencies) => {
    const app = express();

    app.use(helmet());
    app.use(cors({ origin: [dependencies.config.CLIENT_URL], credentials: true }));
    app.use(express.json({ limit: '1024kb' }));
    app.use(createSessionStore);
    morgan(app, { skip: () => dependencies.config.NODE_ENV !== NodeEnv.DEVELOPMENT, logReqUserAgent: false });

    dependencies.routers.forEach(router => app.use(router));

    app.use(withNotFoundErrorHandler);
    app.use(withHttpErrorHandler);

    return app;
};
