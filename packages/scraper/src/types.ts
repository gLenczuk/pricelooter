import { Currency, ProductShopStatus } from '@pricelooter/types';

export interface ScrapeRunOptions {
    url: string;
}

export interface Scraper {
    run: (options: ScrapeRunOptions) => Promise<ScrapedProductResult>;
}

export interface ScrapedProductResult {
    name: string;
    price: number;
    currency: Currency;
    shopStatus: ProductShopStatus;
}
