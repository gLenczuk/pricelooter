/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundError, useErrorHandler } from '@pricelooter/exceptions';
import { NextFunction, Request, Response } from 'express';
import { getApplicationConfig } from '../config';
import { logger } from '../libs/logger';

const config = getApplicationConfig();

export const withNotFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError({ message: 'API route not found.' });
    next(error);
};

export const withHttpErrorHandler = (error: Error | Error[], req: Request, res: Response, next: NextFunction) => {
    if (config.LOG_DETAILED_ERRORS) logger.error(error);

    const errors = useErrorHandler(error);
    const status = errors[0].meta.status;

    return res.status(status).json({ errors });
};
