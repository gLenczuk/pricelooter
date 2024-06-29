import { ApplicationErrorParams } from '@pricelooter/types';
import { ApplicationError } from './ApplicationError';

export class AuthorizationError extends ApplicationError {
    public readonly TYPE: string = 'AUTHORIZATION_ERROR';
    public readonly CODE: number = 403;

    constructor(options?: ApplicationErrorParams) {
        super(options);
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}
