import { number, object, string } from 'yup';
import { VALIDATION_KEYS } from '../keys';
import { UserUpdateOperation } from '@pricelooter/types';

export const CreateUserSchema = object({
    firstName: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
    lastName: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
    email: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY).email(VALIDATION_KEYS.SCHEMA_INVALID_FORMAT),
    password: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY).min(8, VALIDATION_KEYS.SCHEMA_MINIMUM_LENGTH),
})
    .noUnknown(true, VALIDATION_KEYS.SCHEMA_ONLY_ALLOWED_KEYS)
    .strict(true);

const UpdateUnauthenticatedUserOperationSchema = string()
    .required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY)
    .oneOf(
        [UserUpdateOperation.ActivateAccount, UserUpdateOperation.ResetPassword],
        VALIDATION_KEYS.SCHEMA_INVALID_ENUM,
    );

export const ActivateUserSchema = object({
    operation: UpdateUnauthenticatedUserOperationSchema,
    data: object({
        userId: number().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
        token: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
    }).required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
});

export const ResetPasswordSchema = object({
    operation: UpdateUnauthenticatedUserOperationSchema,
    data: object({
        userId: number().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
        token: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
        newPassword: string()
            .required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY)
            .min(8, VALIDATION_KEYS.SCHEMA_MINIMUM_LENGTH),
    }).required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
});
