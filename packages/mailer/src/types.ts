export enum EmailType {
    USER_ACTIVATION = 'USER_ACTIVATION',
    PASSWORD_RESET = 'PASSWORD_RESET',
    PRODUCT_PRICE_NOTIFICATION = 'PRODUCT_PRICE_NOTIFICATION',
}

export interface MailerConfig {
    provider: string;
    sender: {
        name: string;
        email: string;
    };
    options?: {
        apiKey?: string;
        loggerLevel?: string;
    };
}

export interface EmailDTO {
    type: EmailType;
    recipient: string;
    data: Record<string, unknown>;
}

export interface Mailer {
    sendEmail: (email: EmailDTO) => Promise<void> | void;
}
