import { ApplicationErrorParams } from '@pricelooter/types';

export class ApplicationError extends Error {
    public readonly TYPE: string = 'APPLICATION_ERROR';
    public readonly CODE: number = 500;
    public readonly KEY: string | undefined = undefined;
    public readonly FIELD: string | null = null;

    constructor(options?: ApplicationErrorParams) {
        super(options?.message ?? 'An unexpected error occurred.');

        Object.setPrototypeOf(this, ApplicationError.prototype);

        this.KEY = options?.key;
        this.FIELD = options?.field ?? null;
    }
}
