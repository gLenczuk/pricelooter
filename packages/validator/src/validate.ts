import { Schema, ValidateOptions, ValidationError as YupValidationError } from 'yup';
import { ApplicationError, ValidationError } from '@pricelooter/exceptions';

const defaultYupOptions: ValidateOptions = {
    abortEarly: false,
};

const getSingleError = (error: YupValidationError) => {
    const err = new ValidationError({
        message: error.errors[0],
        field: error.path,
    });

    return [err];
};

const getMultipleErrors = (error: YupValidationError) => {
    const errors = error.inner.map(error => {
        return new ValidationError({
            message: error.errors[0],
            field: error.path,
        });
    });

    return errors;
};

const mapYupErrors = (error: YupValidationError) => {
    const isSingleError = error.inner.length <= 0;
    const errors = isSingleError ? getSingleError(error) : getMultipleErrors(error);

    return errors;
};

export const validateSchema = async (data: unknown, schema: Schema, options?: ValidateOptions) => {
    try {
        await schema.validate(data, options ? { ...defaultYupOptions, ...options } : defaultYupOptions);
    } catch (error) {
        if (error instanceof YupValidationError) {
            const errors = mapYupErrors(error);
            throw errors;
        }

        throw new ApplicationError({
            message: `An unexpected error has occurred during validation. ${JSON.stringify(error)}.`,
        });
    }
};
