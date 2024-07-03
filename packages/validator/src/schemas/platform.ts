import { object, string } from 'yup';
import { VALIDATION_KEYS } from '../keys';

export const CreatePlatformSchema = object({
    name: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
    category: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY),
    url: string().required(VALIDATION_KEYS.SCHEMA_REQUIRED_KEY).url(VALIDATION_KEYS.SCHEMA_INVALID_URL),
})
    .noUnknown(true, VALIDATION_KEYS.SCHEMA_ONLY_ALLOWED_KEYS)
    .strict(true);
