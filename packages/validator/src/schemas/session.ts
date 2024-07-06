import * as yup from 'yup';

export const AuthenticateUserSchema = yup
    .object({
        email: yup.string().required('Email is required.').email('Email has invalid format.'),
        password: yup
            .string()
            .required('Password is required.')
            .min(8, 'Password should contain at least 8 characters.'),
    })
    .noUnknown(true, 'Only keys specified in schema are allowed.')
    .strict(true);
