import { object, string } from 'yup';
import { VALIDATION_KEYS } from '../keys';
import { SendNotificationType } from '@pricelooter/types';

const SendNotificationTypeSchema = string()
    .required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY)
    .oneOf([SendNotificationType.ForgotPasswordEmail], VALIDATION_KEYS.SCHEMA_INVALID_ENUM);

export const SendForgotPasswordEmailSchema = object({
    type: SendNotificationTypeSchema,
    data: object({
        email: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY).email(VALIDATION_KEYS.SCHEMA_INVALID_FORMAT),
    }).required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
});
