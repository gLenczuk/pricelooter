import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import ms from 'ms';
import session from 'express-session';
import { getApplicationConfig } from '../../config';
import { prisma } from '../database';

const config = getApplicationConfig();

const prismaSessionStore = new PrismaSessionStore(prisma, {
    checkPeriod: config.NODE_ENV !== 'test' ? ms('7 days') : undefined,
    dbRecordIdIsSessionId: true,
});

export const createSessionStore = session({
    cookie: {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        maxAge: ms('30 days'),
    },
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: prismaSessionStore,
    name: 'pricelooter.sid',
});
