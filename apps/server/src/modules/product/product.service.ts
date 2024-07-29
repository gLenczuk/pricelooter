import { productRepository } from './product.repository';
import { scraperService } from '@pricelooter/scraper';
import {
    ProductMonitorResults,
    CreateProductParams,
    FindManyProductsParams,
    FindUniqueProductParams,
    CountProductsParams,
    UpdateProductParams,
} from './product.types';
import { subHours } from 'date-fns';
import { platformService } from '../platform/platform.service';
import { NotFoundError } from '@pricelooter/exceptions';

const createProduct = async (params: CreateProductParams) => {
    const scraper = scraperService.getScraperForPlatformName(params.platformName);
    const results = await scraper.run({ url: params.url });

    return productRepository.create({
        name: results.name,
        currency: results.currency,
        price: results.price,
        shopStatus: results.shopStatus,
        url: params.url,
        platformId: params.platformId,
        userId: params.userId,
    });
};

const findUniqueProduct = async (params: FindUniqueProductParams) => {
    return productRepository.findOne({
        id: params.id,
    });
};

const findManyProducts = async (params: FindManyProductsParams) => {
    return productRepository.findMany(params);
};

const countProducts = async (params: CountProductsParams) => {
    return productRepository.count(params);
};

const updateProduct = async (params: UpdateProductParams) => {
    return productRepository.updateOne(params);
};

const findExpiredProductsToScrape = async () => {
    const now = new Date();
    const sixHoursAgo = subHours(now, 6);

    return productRepository.findMany({
        filter: {
            scrapedAt: {
                value: sixHoursAgo,
                expression: 'lte',
            },
        },
    });
};

const runProductMonitor = async (): Promise<ProductMonitorResults> => {
    const products = await findExpiredProductsToScrape();

    if (products.length <= 0) {
        return {
            oldProducts: [],
            newProducts: [],
        };
    }

    const platformIds = products.map(product => product.platformId);
    const platforms = await platformService.findManyPlatforms({
        filter: {
            ids: platformIds,
        },
    });

    const operations = products.map(async product => {
        const productPlatform = platforms.find(platform => product.platformId === platform.id);

        if (!productPlatform)
            throw new NotFoundError({
                message: `Cannot find Platform in product monitor for Product (${product.id})`,
            });

        const scraper = scraperService.getScraperForPlatformName(productPlatform.name);
        const results = await scraper.run({ url: product.url });

        const updatedProduct = await productRepository.updateOne({
            filter: {
                id: product.id,
            },
            data: {
                name: product.name !== results.name ? results.name : undefined,
                price: product.price !== results.price ? results.price : undefined,
                currency: product.currency !== results.currency ? results.currency : undefined,
                scrapedAt: new Date(),
                shopStatus: product.shopStatus !== results.shopStatus ? results.shopStatus : undefined,
            },
        });

        return updatedProduct;
    });

    const updatedProducts = await Promise.all(operations);

    return {
        oldProducts: products,
        newProducts: updatedProducts,
    };
};

export const productService = {
    createProduct,
    findUniqueProduct,
    findManyProducts,
    runProductMonitor,
    countProducts,
    updateProduct,
};
