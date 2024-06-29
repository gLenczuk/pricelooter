export enum SendNotificationType {
    ForgotPasswordEmail = 'FORGOT_PASSWORD_EMAIL',
}

export interface SendForgotPasswordEmailRequest {
    type: SendNotificationType.ForgotPasswordEmail;
    data: {
        email: string;
    };
}

export type SendNotificationRequest = SendForgotPasswordEmailRequest;
