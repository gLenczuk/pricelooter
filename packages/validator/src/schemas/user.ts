import { number, object, string } from 'yup';
import { UserUpdateOperation } from '@pricelooter/types';

export const CreateUserSchema = object({
    username: string().required('Username is required.'),
    email: string().required('Email is required.').email('Email has invalid format.'),
    password: string().required('Password is required.').min(8, 'Password should contain at least 8 characters.'),
})
    .noUnknown(true, 'Only keys specified in schema are allowed.')
    .strict(true);

const UpdateUnauthenticatedUserOperationSchema = string()
    .required('Operation is required.')
    .oneOf([UserUpdateOperation.ActivateAccount, UserUpdateOperation.ResetPassword], 'Invalid operation value.');

export const ActivateUserSchema = object({
    operation: UpdateUnauthenticatedUserOperationSchema,
    data: object({
        userId: number().required('User ID is required.'),
        token: string().required('Token is required.'),
    }).required('Activate user data object is required.'),
});

export const ResetPasswordSchema = object({
    operation: UpdateUnauthenticatedUserOperationSchema,
    data: object({
        userId: number().required('User ID is required.'),
        token: string().required('Token is required.'),
        newPassword: string()
            .required('New password is required.')
            .min(8, 'Password should contain at least 8 characters.'),
    }).required('Reset password data object is required.'),
});
