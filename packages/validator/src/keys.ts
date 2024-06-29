export const VALIDATION_KEYS = {
    SCHEMA_REQUIRED_KEY: 'is_required',
    SCHEMA_INVALID_FORMAT: 'invalid_format',
    SCHEMA_MINIMUM_LENGTH: 'minimum_length',
    SCHEMA_MAXIMUM_LENGTH: 'maximum_length',
    SCHEMA_ONLY_ALLOWED_KEYS: 'only_allowed_schema_values',
    SCHEMA_INVALID_ENUM: 'only_allowed_enum_values',
    SCHEMA_INVALID_URL: 'invalid_url',
} as const;

export const MESSAGES_PER_KEY = {
    [VALIDATION_KEYS.SCHEMA_REQUIRED_KEY]: 'Field is required.',
    [VALIDATION_KEYS.SCHEMA_INVALID_FORMAT]: 'Invalid field format.',
    [VALIDATION_KEYS.SCHEMA_MINIMUM_LENGTH]: 'Value is too short.',
    [VALIDATION_KEYS.SCHEMA_MAXIMUM_LENGTH]: 'Value is too long.',
    [VALIDATION_KEYS.SCHEMA_ONLY_ALLOWED_KEYS]: 'Only keys specified in schema are allowed.',
    [VALIDATION_KEYS.SCHEMA_INVALID_ENUM]: 'Invalid enum value.',
    [VALIDATION_KEYS.SCHEMA_INVALID_URL]: 'Invali URL format.',
} as const;
