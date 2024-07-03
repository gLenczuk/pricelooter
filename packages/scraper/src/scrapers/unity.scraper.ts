import puppeteer from 'puppeteer';
import { Currency, ProductShopStatus } from '@pricelooter/types';
import { ScrapeRunOptions, ScrapedProductResult, Scraper } from '../types';
import { ApplicationError, ValidationError } from '@pricelooter/exceptions';

const extractAndParsePrice = (price: string): number => {
    const match = price.match(/[\d.]+/);

    if (!match) throw new ApplicationError({ message: 'Price cannot be extracted in Unity scraper.' });

    const parsedPrice = parseFloat(match[0]);

    return parsedPrice * 100;
};

const run = async (options: ScrapeRunOptions): Promise<ScrapedProductResult> => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(options.url);

    await Promise.all([
        await page.waitForSelector('[data-test="product-detail-price-label"]'),
        await page.waitForSelector('#main-layout-scroller'),
    ]);

    const [firstPriceDiv, titleHeader] = await Promise.all([
        await page.$('[data-test="product-detail-price-label"] > div > div > div'),
        await page.$(
            '#main-layout-scroller > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2) > div > h1',
        ),
    ]);

    if (!firstPriceDiv) throw new ValidationError({ message: 'Cannot find HTML element for Price in Unity scraper' });
    if (!titleHeader)
        throw new ValidationError({ message: 'Cannot find HTML element for Asset Name in Unity scraper' });

    const [firstPrice, assetName] = await Promise.all([
        await firstPriceDiv?.evaluate(element => element.innerText),
        await titleHeader?.evaluate(element => element.textContent),
    ]);

    if (!firstPrice) throw new ValidationError({ message: 'Price cannot be found in Unity scraper.' });
    if (!assetName) throw new ValidationError({ message: 'Asset Name cannot be found in Unity scraper.' });

    await page.close();
    await browser.close();

    return {
        name: assetName,
        price: extractAndParsePrice(firstPrice),
        currency: Currency.EUR,
        shopStatus: ProductShopStatus.AVAILABLE,
    };
};

export const unityScraper: Scraper = {
    run,
};
