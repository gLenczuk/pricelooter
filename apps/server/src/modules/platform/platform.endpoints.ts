import express, { Response as ExpressResponse, Request as ExpressRequest } from 'express';
import { getApplicationConfig } from '../../config';
import { withSchemaValidation } from '../../middlewares/withSchemaValidation';
import { ExtendedExpressSession, TypedExpressRequest } from '../../types';
import { SyncEventEmitter } from '../../libs/sync-event-emitter';
import withAsyncHandler from 'express-async-handler';
import { CreatePlatformSchema } from '@pricelooter/validator';
import { CreatePlatformRequest, CreatePlatformResponse, GetPlatformsResponse } from '@pricelooter/types';
import { platformController } from './platform.controller';
import { getRequestLanguage } from '../../utils/getRequestLanguage';

export const platformRouter = express.Router();

export const CREATE_PLATFORM_ENDPOINT = '/api/v1/platforms';
export const GET_PLATFORMS_ENDPOINT = '/api/v1/platforms';

platformRouter.post(
    CREATE_PLATFORM_ENDPOINT,
    withSchemaValidation(CreatePlatformSchema),
    withAsyncHandler(
        async (req: TypedExpressRequest<CreatePlatformRequest>, res: ExpressResponse<CreatePlatformResponse>) => {
            const language = getRequestLanguage(req.headers['accept-language']);

            const platform = await platformController.createPlatform({
                body: req.body,
                session: req.session as ExtendedExpressSession,
                config: getApplicationConfig(),
                language,
            });

            SyncEventEmitter.emit('ON_PLATFORM_CREATED', { platform, language });

            res.status(201).json({
                body: { platform },
                key: 'platform_created',
                meta: {},
            });
        },
    ),
);

platformRouter.get(
    GET_PLATFORMS_ENDPOINT,
    withAsyncHandler(async (req: ExpressRequest, res: ExpressResponse<GetPlatformsResponse>) => {
        const platforms = await platformController.getPlatforms();

        res.status(200).json({
            body: { platforms },
            key: 'platforms_found',
            meta: {},
        });
    }),
);
