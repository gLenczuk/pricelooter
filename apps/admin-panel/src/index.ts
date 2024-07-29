import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { logger } from './libs/logger/index.js';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import { prisma } from './libs/database/index.js';
import { getApplicationConfig } from './config.js';
import { prismaSessionStore } from './libs/session-store/index.js';
import ms from 'ms';

AdminJS.registerAdapter({ Database, Resource });

const authenticate = async (email: string, password: string) => {
    const config = getApplicationConfig();

    if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
        return Promise.resolve({
            email,
            password,
        });
    }

    return null;
};

const start = async () => {
    const app = express();

    const usersNavigationGroup = {
        name: 'Users',
        icon: 'User',
    };

    const resources = [
        {
            resource: { model: getModelByName('Platform'), client: prisma },
            options: {
                navigation: {
                    icon: 'Server',
                },
            },
        },
        {
            resource: { model: getModelByName('User'), client: prisma },
            options: {
                navigation: usersNavigationGroup,
            },
        },
        {
            resource: { model: getModelByName('Product'), client: prisma },
            options: {
                navigation: {
                    icon: 'ShoppingCart',
                },
            },
        },
        {
            resource: { model: getModelByName('Session'), client: prisma },
            options: {
                navigation: usersNavigationGroup,
            },
        },
        {
            resource: { model: getModelByName('Token'), client: prisma },
            options: {
                navigation: {
                    icon: 'Key',
                },
            },
        },
    ];

    const config = getApplicationConfig();
    const admin = new AdminJS({ resources });
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: 'pricelooter.admin.sid',
            cookiePassword: config.SESSION_SECRET,
        },
        null,
        {
            store: prismaSessionStore,
            cookie: {
                httpOnly: true,
                secure: config.NODE_ENV === 'production',
                maxAge: ms('30 days'),
            },
            secret: config.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            name: 'pricelooter.admin.sid',
        },
    );
    app.use(admin.options.rootPath, adminRouter);

    app.use(admin.options.rootPath, adminRouter);

    app.listen(config.ADMIN_PORT, () => {
        logger.info(`AdminJS started on http://localhost:${config.ADMIN_PORT}${admin.options.rootPath}`);
        admin.watch();
    });
};

start();
