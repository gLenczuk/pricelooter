import { ValidationError } from '@pricelooter/exceptions';
import sendgrid from '@sendgrid/mail';
import path from 'path';
import ejs from 'ejs';
import { EmailDTO, MailerConfig, Mailer } from '../types';
import { emailTemplatesByType, subjectsPerEmailType } from '../utils';

const sendEmailWithSendgrid = async (email: EmailDTO, config: MailerConfig) => {
    if (!email.recipient) {
        throw new ValidationError({ message: 'Missing recipient. Cannot send an email.' });
    }

    const subject = subjectsPerEmailType[email.type];

    if (!subject) {
        throw new ValidationError({ message: 'Missing subject. Cannot send an email.' });
    }

    const emailTemplate = emailTemplatesByType[email.type];

    if (!emailTemplate) {
        throw new ValidationError({ message: 'Missing email template.' });
    }

    const pathToTemplate = path.join(__dirname, `../templates/${emailTemplate}`);
    const renderedTemplate = await ejs.renderFile(pathToTemplate, email.data);

    const message = {
        to: email.recipient,
        from: {
            name: config.sender.name,
            email: config.sender.email,
        },
        subject,
        html: renderedTemplate,
    };

    await sendgrid.send(message);
};

export const createSendgridMailerInstance = (config: MailerConfig): Mailer => {
    if (!config.options || !config.options.apiKey) {
        throw new ValidationError({ message: 'API key is required to use Sendgrid mailer.' });
    }

    sendgrid.setApiKey(config.options.apiKey);

    return {
        sendEmail: (email: EmailDTO) => sendEmailWithSendgrid(email, config),
    };
};
