import { ApplicationErrorParams } from '@pricelooter/types';
import { ApplicationError } from './ApplicationError';

export class ExistingResourceError extends ApplicationError {
    public readonly TYPE: string = 'EXISTING_RESOURCE_ERROR';
    public readonly CODE: number = 409;

    constructor(options?: ApplicationErrorParams) {
        super(options);
        Object.setPrototypeOf(this, ExistingResourceError.prototype);
    }
}
