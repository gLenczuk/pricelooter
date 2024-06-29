import { createLoggerMailerInstance } from './mailers/logger.mailer';
import { createSendgridMailerInstance } from './mailers/sendgrid.mailer';
import { MailerConfig } from './types';

const mailersPerProvider = {
    local: createLoggerMailerInstance,
    sendgrid: createSendgridMailerInstance,
};

export const createMailerInstance = (config: MailerConfig) => {
    const factoryFunction =
        mailersPerProvider[config.provider as keyof typeof mailersPerProvider] ?? createLoggerMailerInstance;

    return factoryFunction(config);
};

export * from './types';
