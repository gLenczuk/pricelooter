import * as yup from 'yup';
import { VALIDATION_KEYS } from '../keys';

export const AuthenticateUserSchema = yup
    .object({
        email: yup.string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY).email(VALIDATION_KEYS.SCHEMA_INVALID_FORMAT),
        password: yup
            .string()
            .required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY)
            .min(8, VALIDATION_KEYS.SCHEMA_MINIMUM_LENGTH),
    })
    .noUnknown(true, VALIDATION_KEYS.SCHEMA_ONLY_ALLOWED_KEYS)
    .strict(true);
