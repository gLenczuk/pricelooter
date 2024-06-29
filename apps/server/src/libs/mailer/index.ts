import { createMailerInstance } from '@pricelooter/mailer';
import { getApplicationConfig } from '../../config';
import { NodeEnv } from '@pricelooter/types';
import { logger } from '../logger';

const config = getApplicationConfig();

if (config.NODE_ENV === NodeEnv.DEVELOPMENT && config.MAILER_PROVIDER !== 'local') {
    logger.warn(
        "You're using mailer different than local in development environment. Are you sure you want to do that?",
    );
}

export const mailer = createMailerInstance({
    sender: {
        name: config.MAILER_SENDER_NAME,
        email: config.MAILER_SENDER_EMAIL,
    },
    provider: config.MAILER_PROVIDER,
    options: {
        apiKey: config.MAILER_API_KEY,
        loggerLevel: config.LOGGER_LEVEL,
    },
});
