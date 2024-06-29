import { Language, SendNotificationType } from '@pricelooter/types';
import { Schema } from 'yup';

export interface SendAccountActivationEmailParams {
    userId: number;
    userEmail: string;
    language: Language;
}

export interface SendForgotPasswordRequestEmailParams {
    email: string;
    language: Language;
}

export type SendNotificationSchemas = Record<SendNotificationType, Schema>;
