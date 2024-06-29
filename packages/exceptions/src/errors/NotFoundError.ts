import { ApplicationErrorParams } from '@pricelooter/types';
import { ApplicationError } from './ApplicationError';

export class NotFoundError extends ApplicationError {
    public readonly TYPE: string = 'NOT_FOUND_ERROR';
    public readonly CODE: number = 404;

    constructor(options?: ApplicationErrorParams) {
        super(options);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
