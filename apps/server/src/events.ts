import { logger } from './libs/logger';
import { SyncEventEmitter } from './libs/sync-event-emitter';
import { notificationService } from './modules/notification/notification.service';

SyncEventEmitter.on('ON_USER_CREATED', async event => {
    try {
        await notificationService.sendAccountActivationEmail({
            userId: event.user.id,
            userEmail: event.user.email,
            language: event.language,
        });
    } catch (error) {
        // TODO: add production error handling like Sentry for example.
        logger.error(error);
    }
});
