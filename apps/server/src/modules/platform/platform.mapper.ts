import { PlatformDTO } from '@pricelooter/types';
import Prisma from '@prisma/client';
import { productMapper } from '../product/product.mapper';

type DatabasePlatform = Prisma.Platform & { products?: Prisma.Product[] };

const mapDatabasePlatformToPlatformDTO = (databasePlatform: DatabasePlatform): PlatformDTO => ({
    id: databasePlatform.id,
    name: databasePlatform.name,
    url: databasePlatform.url,
    products: databasePlatform.products
        ? databasePlatform.products.map(productMapper.mapDatabaseProductToProductDTO)
        : [],
    createdAt: databasePlatform.createdAt,
    updatedAt: databasePlatform.updatedAt,
    deletedAt: databasePlatform.deletedAt || null,
});

export const platformMapper = {
    mapDatabasePlatformToPlatformDTO,
};
