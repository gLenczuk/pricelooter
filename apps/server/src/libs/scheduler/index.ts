import scheduler from 'node-schedule';
import { productService } from '../../modules/product/product.service';
import { logger } from '../logger';
import { notificationService } from '../../modules/notification/notification.service';

const productMonitorJob = async () => {
    try {
        logger.debug(`Running product monitor at ${new Date()}`);
        const results = await productService.runProductMonitor();
        logger.debug(`Finished product monitor at ${new Date()}`);

        await notificationService.processProductMonitorResults(results);
    } catch (error) {
        // TODO: add proper error handling
        logger.error(error);
    }
};

const scheduleJobs = () => {
    scheduler.scheduleJob('ProductMonitor', '*/15 * * * *', productMonitorJob);
};

export const scheduleService = {
    scheduler,
    scheduleJobs,
};
