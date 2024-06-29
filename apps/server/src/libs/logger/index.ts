import { createLogger } from '@pricelooter/logger';
import { getApplicationConfig } from '../../config';

export const logger = createLogger({
    level: getApplicationConfig().LOGGER_LEVEL,
});
