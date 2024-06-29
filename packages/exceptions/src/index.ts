import { ApplicationErrorDTO } from '@pricelooter/types';
import { ApplicationError } from './errors/ApplicationError';

export const mapErrorsToDTO = (errors: Error[] | ApplicationError[]): ApplicationErrorDTO[] =>
    errors.map(error => ({
        type: 'TYPE' in error && error.TYPE ? error.TYPE : 'APPLICATION_ERROR',
        message: error.message,
        meta: {
            status: 'CODE' in error && error.CODE ? error.CODE : 500,
            field: 'FIELD' in error && error.FIELD ? error.FIELD : null,
            key: 'KEY' in error && error.KEY ? error.KEY : null,
        },
    }));

export const useErrorHandler = (error: Error | Error[]) => {
    const applicationErrors = Array.isArray(error) ? error : [error];
    const parsedApplicationErrors = mapErrorsToDTO(applicationErrors);

    return parsedApplicationErrors;
};

export { ApplicationError } from './errors/ApplicationError';
export { AuthorizationError } from './errors/AuthorizationError';
export { AuthenticationError } from './errors/AuthenticationError';
export { NotFoundError } from './errors/NotFoundError';
export { ValidationError } from './errors/ValidationError';
export { ExistingResourceError } from './errors/ExistingResourceError';
