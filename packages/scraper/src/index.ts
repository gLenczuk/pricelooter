import { ApplicationError } from '@pricelooter/exceptions';
import { unityScraper } from './scrapers/unity.scraper';
import { Scraper } from './types';

const scrapersPerPlatformName: Record<string, Scraper> = {
    'Unity Asset Store': unityScraper,
};

const getScraperForPlatformName = (platformName: string) => {
    const scraper = scrapersPerPlatformName[platformName];

    if (!scraper)
        throw new ApplicationError({ message: `Cannot find scraper for given platform name (${platformName}).` });

    return scraper;
};

export const scraperService = {
    getScraperForPlatformName,
};
