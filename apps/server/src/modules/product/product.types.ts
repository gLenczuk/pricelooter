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
}

export type CreateDatabaseProductQuery = CreateProductDTO;

export interface CreateDomainProductParams {
    url: string;
    platformName: string;
    platformId: number;
    userId: number;
}
export type FindOneDatabaseProductQuery = FindOneProductDTO;

export type FindUniqueDomainProductParams = FindOneProductDTO;

export type FindManyDatabaseProuductsQuery = FindManyProductsDTO;

export type FindManyDomainProductsParams = FindManyProductsDTO;

export type UpdateOneDatabaseProductQuery = UpdateOneProductDTO;

export interface ProductMonitorResults {
    oldProducts: ProductDTO[];
    newProducts: ProductDTO[];
}
