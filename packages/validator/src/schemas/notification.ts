import { object, string } from 'yup';
import { SendNotificationType } from '@pricelooter/types';

const SendNotificationTypeSchema = string()
    .required('Notification type is required.')
    .oneOf([SendNotificationType.ForgotPasswordEmail], 'Invalid notification type.');

export const SendForgotPasswordEmailSchema = object({
    type: SendNotificationTypeSchema,
    data: object({
        email: string().required('Email is required.').email('Invalid email format.'),
    }).required('Only keys specified in schema are allowed.'),
});
