import { ProductDTO } from './product';

export interface PlatformDTO {
    id: number;
    name: string;
    url: string;
    category: string;
    products: ProductDTO[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreatePlatformRequest {
    name: string;
    category: string;
    url: string;
}
