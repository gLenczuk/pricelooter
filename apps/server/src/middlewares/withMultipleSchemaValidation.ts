import { NextFunction, Request, Response } from 'express';
import { validateSchema } from '@pricelooter/validator';
import { AnyObject } from '@pricelooter/types';
import { ValidationError } from '@pricelooter/exceptions';
import { Schema } from 'yup';

export const withMultipleSchemaValidation =
    <T extends AnyObject>(schemas: Partial<T>, accessor: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const key = req.body[accessor];
            const schema = schemas[key] as Schema;

            if (!schema)
                throw new ValidationError({
                    message: `Cannot find schema for given update operation (${req.body.operation}).`,
                });

            await validateSchema({ ...req.body, ...req.query, ...req.params }, schema);

            next();
        } catch (error) {
            next(error);
        }
    };
