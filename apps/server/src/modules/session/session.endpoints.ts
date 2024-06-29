import withAsyncHandler from 'express-async-handler';
import express, { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { AuthenticateUserSchema } from '@pricelooter/validator';
import { withSchemaValidation } from '../../middlewares/withSchemaValidation';
import { ExtendedExpressSession, TypedExpressRequest } from '../../types';
import { AuthenticateUserRequest, EmptyResponse } from '@pricelooter/types';
import { sessionController } from './session.controller';
import { withSessionAuthentication } from '../../middlewares/withSessionAuthentication';
import { getApplicationConfig } from '../../config';
import { ApplicationError } from '@pricelooter/exceptions';
import { GetCurrentUserResponse } from '@pricelooter/types';
import { AuthenticateUserResponse } from '@pricelooter/types';
import { getRequestLanguage } from '../../utils/getRequestLanguage';

export const AUTHENTICATE_USER_ENDPOINT = '/api/v1/sessions';
export const GET_CURRENT_SESSION_USER_ENDPOINT = '/api/v1/sessions/me';
export const LOGOUT_CURRENT_USER = '/api/v1/sessions/me';

export const sessionRouter = express.Router();

sessionRouter.post(
    AUTHENTICATE_USER_ENDPOINT,
    withSchemaValidation(AuthenticateUserSchema),
    withAsyncHandler(
        async (req: TypedExpressRequest<AuthenticateUserRequest>, res: ExpressResponse<AuthenticateUserResponse>) => {
            const language = getRequestLanguage(req.headers['accept-language']);

            const user = await sessionController.authenticateUser({
                body: req.body,
                session: req.session as ExtendedExpressSession,
                config: getApplicationConfig(),
                language,
            });

            (req.session as ExtendedExpressSession).user = {
                id: user.id,
            };

            res.status(200).json({
                body: { user: { ...user, password: null } },
                key: null,
                meta: {},
            });
        },
    ),
);

sessionRouter.get(
    GET_CURRENT_SESSION_USER_ENDPOINT,
    withSessionAuthentication,
    withAsyncHandler(async (req: ExpressRequest, res: ExpressResponse<GetCurrentUserResponse>) => {
        const language = getRequestLanguage(req.headers['accept-language']);

        const user = await sessionController.getCurrentUser({
            body: {},
            session: req.session as ExtendedExpressSession,
            config: getApplicationConfig(),
            language,
        });

        res.status(200).json({
            body: { user: { ...user, password: null } },
            key: null,
            meta: {},
        });
    }),
);

sessionRouter.delete(
    LOGOUT_CURRENT_USER,
    withSessionAuthentication,
    withAsyncHandler(async (req: ExpressRequest, res: ExpressResponse<EmptyResponse>) => {
        req.session.destroy(error => {
            if (error) throw new ApplicationError({ message: error.message });

            res.status(200).json({
                body: {},
                key: null,
                meta: {},
            });
        });
    }),
);
