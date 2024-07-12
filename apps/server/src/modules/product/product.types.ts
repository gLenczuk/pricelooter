import { Currency, ProductDTO, ProductShopStatus } from '@pricelooter/types';

interface CreateProductDTO {
    name: string;
    url: string;
    price: number;
    currency: Currency;
    shopStatus: ProductShopStatus;
    platformId: number;
    userId: number;
}

interface UpdateProductDataDTO {
    name?: string;
    url?: string;
    price?: number;
    currency?: Currency;
    shopStatus?: ProductShopStatus;
    scrapedAt?: Date;
}

interface UpdateProductFilterDTO {
    id?: number;
}

interface UpdateOneProductDTO {
    filter: UpdateProductFilterDTO;
    data: UpdateProductDataDTO;
}

interface FindOneProductDTO {
    id?: number;
}

interface FindManyProductsFilterDTO {
    url?: string;
    userId?: number;
    scrapedAt?: {
        value: Date;
        expression: 'lte' | 'gte';
    };
}

interface FindManyProductsDTO {
    filter?: FindManyProductsFilterDTO;
    pagination?: {
        page: number;
        perPage: number;
    };
}

interface CountProductsDTO {
    filter?: FindManyProductsFilterDTO;
}

export type CreateDatabaseProductQuery = CreateProductDTO;

export interface CreateProductParams {
    url: string;
    platformName: string;
    platformId: number;
    userId: number;
}
export type FindOneDatabaseProductQuery = FindOneProductDTO;

export type FindUniqueProductParams = FindOneProductDTO;

export type FindManyDatabaseProuductsQuery = FindManyProductsDTO;

export type CountDatabaseProductsQuery = CountProductsDTO;

export type CountProductsParams = CountProductsDTO;

export type FindManyProductsParams = FindManyProductsDTO;

export type UpdateOneDatabaseProductQuery = UpdateOneProductDTO;

export interface ProductMonitorResults {
    oldProducts: ProductDTO[];
    newProducts: ProductDTO[];
}
