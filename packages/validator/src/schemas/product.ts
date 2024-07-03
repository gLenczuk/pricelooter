import { object, string, number } from 'yup';
import { VALIDATION_KEYS } from '../keys';

export const CreateProductSchema = object({
    platformId: number().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
    url: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY).url(VALIDATION_KEYS.SCHEMA_INVALID_URL),
})
    .noUnknown(true, VALIDATION_KEYS.SCHEMA_ONLY_ALLOWED_KEYS)
    .strict(true);
