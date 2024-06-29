import { createApplication } from './app';
import { getApplicationConfig } from './config';
import { prisma } from './libs/database';
import { logger } from './libs/logger';
import { notificationRouter } from './modules/notification/notification.endpoints';
import { sessionRouter } from './modules/session/session.endpoints';
import { userRouter } from './modules/user/user.endpoints';
import { createServer } from './server';
import './events';

const startApplication = async () => {
    try {
        const config = getApplicationConfig();
        const { SERVER_HOST, SERVER_PORT } = config;

        await prisma.$queryRaw`SELECT 1=1 AS "database ready";`;

        const express = createApplication({
            routers: [userRouter, sessionRouter, notificationRouter],
            config,
        });
        const httpServer = createServer(express);

        httpServer.listen(SERVER_PORT);
        logger.info(`HTTP server is listening on ${SERVER_HOST}:${SERVER_PORT}`);
    } catch (error) {
        logger.error(error);

        process.exitCode = 1;
    }
};

startApplication();
