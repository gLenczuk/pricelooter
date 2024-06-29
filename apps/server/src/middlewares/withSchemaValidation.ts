import { NextFunction, Request, Response } from 'express';
import { Schema } from 'yup';
import { validateSchema } from '@pricelooter/validator';

export const withSchemaValidation = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validateSchema({ ...req.body, ...req.query, ...req.params }, schema);

        next();
    } catch (error) {
        next(error);
    }
};
