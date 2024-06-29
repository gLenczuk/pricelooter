import { AuthenticationError } from '@pricelooter/exceptions';
import { NextFunction, Request, Response } from 'express';
import { ExtendedExpressSession } from '../types';

export const withSessionAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.session as ExtendedExpressSession;

    if (!user) {
        const error = new AuthenticationError({ message: `User is not authenticated.` });

        return next(error);
    }

    return next();
};
