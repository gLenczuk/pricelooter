import { PlatformDTO } from './platform';
import { UserDTO } from './user';

export enum ProductShopStatus {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE',
}

export enum Currency {
    EUR = 'EUR',
    USD = 'USD',
    PLN = 'PLN',
}

export interface ProductDTO {
    id: number;
    name: string;
    url: string;
    price: number;
    currency: Currency;
    shopStatus: ProductShopStatus;
    platformId: number;
    platform: PlatformDTO | null;
    userId: number;
    user: Omit<UserDTO, 'password'> | null;
    scrapedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateProductRequest {
    url: string;
    platformId: number;
}

export interface GetProductsRequest {
    page: number;
}

export interface DeleteProductRequest {
    productId: number;
}
