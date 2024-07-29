import { createLogger } from '@pricelooter/logger';
import { getApplicationConfig } from '../../config.js';

export const logger = createLogger({
    level: getApplicationConfig().LOGGER_LEVEL,
});
