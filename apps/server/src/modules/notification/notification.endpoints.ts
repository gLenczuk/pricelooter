import express, { Response as ExpressResponse } from 'express';
import withAsyncHandler from 'express-async-handler';
import { withMultipleSchemaValidation } from '../../middlewares/withMultipleSchemaValidation';
import { SendNotificationSchemas } from './notification.types';
import { ExtendedExpressSession, TypedExpressRequest } from '../../types';
import { SendNotificationRequest } from '@pricelooter/types';
import { SendForgotPasswordEmailSchema } from '@pricelooter/validator';
import { getRequestLanguage } from '../../utils/getRequestLanguage';
import { notificationController } from './notification.controller';
import { getApplicationConfig } from '../../config';

export const notificationRouter = express.Router();

export const SEND_NOTIFICATION_ENDPOINT = '/api/v1/notifications';

notificationRouter.post(
    SEND_NOTIFICATION_ENDPOINT,
    withMultipleSchemaValidation<SendNotificationSchemas>(
        { FORGOT_PASSWORD_EMAIL: SendForgotPasswordEmailSchema },
        'type',
    ),
    withAsyncHandler(async (req: TypedExpressRequest<SendNotificationRequest>, res: ExpressResponse) => {
        const language = getRequestLanguage(req.headers['accept-language']);

        await notificationController.sendNotification({
            body: req.body,
            session: req.session as ExtendedExpressSession,
            config: getApplicationConfig(),
            language,
        });

        res.status(200).json({
            body: {},
            key: null,
            meta: {},
        });
    }),
);
