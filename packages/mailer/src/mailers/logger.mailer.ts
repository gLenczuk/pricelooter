import { Mailer, MailerConfig } from '../types';
import { createLogger } from '@pricelooter/logger';

export const createLoggerMailerInstance = (config: MailerConfig): Mailer => {
    const logger = createLogger({
        level: config.options?.loggerLevel ?? 'debug',
    });

    return {
        sendEmail: email => {
            logger.debug(`Sending ${email.type} email to ${email.recipient} with data: ${JSON.stringify(email.data)}`);
        },
    };
};
