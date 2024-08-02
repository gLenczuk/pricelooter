import { SendNotificationType } from '@pricelooter/types';
import { Schema } from 'yup';

export interface SendAccountActivationEmailParams {
    userId: number;
    userEmail: string;
}

export interface SendForgotPasswordRequestEmailParams {
    email: string;
}

export type SendNotificationSchemas = Record<SendNotificationType, Schema>;
