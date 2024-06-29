import { ApplicationErrorParams } from '@pricelooter/types';
import { ApplicationError } from './ApplicationError';

export class AuthenticationError extends ApplicationError {
    public readonly TYPE: string = 'AUTHENTICATION_ERROR';
    public readonly CODE: number = 401;

    constructor(options?: ApplicationErrorParams) {
        super(options);
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
