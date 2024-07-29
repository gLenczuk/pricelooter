import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import ms from 'ms';
import { prisma } from '../database/index.js';
import { getApplicationConfig } from '../../config.js';

const config = getApplicationConfig();

export const prismaSessionStore = new PrismaSessionStore(prisma, {
    checkPeriod: config.NODE_ENV !== 'test' ? ms('7 days') : undefined,
    dbRecordIdIsSessionId: true,
});
