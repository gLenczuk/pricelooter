import express, { Response as ExpressResponse } from 'express';
import { userController } from './user.controller';
import { getApplicationConfig } from '../../config';
import { CreateUserRequest, CreateUserResponse, UpdateUserRequest, UpdateUserResponse } from '@pricelooter/types';
import { ExtendedExpressSession, TypedExpressRequest } from '../../types';
import withAsyncHandler from 'express-async-handler';
import { SyncEventEmitter } from '../../libs/sync-event-emitter';
import { getRequestLanguage } from '../../utils/getRequestLanguage';
import { withSchemaValidation } from '../../middlewares/withSchemaValidation';
import { CreateUserSchema, ActivateUserSchema, ResetPasswordSchema } from '@pricelooter/validator';
import { withSessionAuthentication } from '../../middlewares/withSessionAuthentication';
import { AuthorizationError, ValidationError } from '@pricelooter/exceptions';
import { withMultipleSchemaValidation } from '../../middlewares/withMultipleSchemaValidation';
import { UserUpdateSchemas } from './user.types';

export const userRouter = express.Router();

export const CREATE_USER_ENDPOINT = '/api/v1/users';
export const UPDATE_UNAUTHENTICATED_USER_ENDPOINT = '/api/v1/users/me';
export const UPDATE_AUTHENTICATED_USER_ENDPOINT = '/api/v1/users/:id';

userRouter.post(
    CREATE_USER_ENDPOINT,
    withSchemaValidation(CreateUserSchema),
    withAsyncHandler(async (req: TypedExpressRequest<CreateUserRequest>, res: ExpressResponse<CreateUserResponse>) => {
        const language = getRequestLanguage(req.headers['accept-language']);

        const user = await userController.createUser({
            body: req.body,
            session: req.session as ExtendedExpressSession,
            config: getApplicationConfig(),
            language,
        });

        SyncEventEmitter.emit('ON_USER_CREATED', { user, language });

        res.status(201).json({
            body: { user: { ...user, password: null } },
            key: null,
            meta: {},
        });
    }),
);

userRouter.patch(
    UPDATE_UNAUTHENTICATED_USER_ENDPOINT,
    withMultipleSchemaValidation<UserUpdateSchemas>(
        {
            ACTIVATE_ACCOUNT: ActivateUserSchema,
            RESET_PASSWORD: ResetPasswordSchema,
        },
        'operation',
    ),
    withAsyncHandler(async (req: TypedExpressRequest<UpdateUserRequest>, res: ExpressResponse<UpdateUserResponse>) => {
        const language = getRequestLanguage(req.headers['accept-language']);

        const user = await userController.updateUser({
            body: req.body,
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

userRouter.patch(
    UPDATE_AUTHENTICATED_USER_ENDPOINT,
    withMultipleSchemaValidation<UserUpdateSchemas>({}, 'operation'),
    withSessionAuthentication,
    withAsyncHandler(async (req: TypedExpressRequest<UpdateUserRequest>, res: ExpressResponse<UpdateUserResponse>) => {
        const language = getRequestLanguage(req.headers['accept-language']);
        const userId = Number(req.params.id);

        if (!userId || typeof userId !== 'number') {
            throw new ValidationError({ message: 'User ID should be a number.' });
        }

        const session = req.session as ExtendedExpressSession;

        if (session.user?.id !== userId) {
            throw new AuthorizationError({ message: 'Cannot perform update on another user than current logged one.' });
        }

        const user = await userController.updateUser({
            body: req.body,
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
