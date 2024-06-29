import { ApplicationErrorParams } from '@pricelooter/types';
import { ApplicationError } from './ApplicationError';

export class ValidationError extends ApplicationError {
    public readonly TYPE: string = 'VALIDATION_ERROR';
    public readonly CODE: number = 400;

    constructor(options?: ApplicationErrorParams) {
        super(options);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
