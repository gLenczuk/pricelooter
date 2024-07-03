import { Currency, ProductDTO, ProductShopStatus } from '@pricelooter/types';
import Prisma from '@prisma/client';
import { platformMapper } from '../platform/platform.mapper';
import { userMapper } from '../user/user.mapper';

type DatabaseProduct = Prisma.Product & { user?: Prisma.User; platform?: Prisma.Platform };

const mapDatabaseProductToProductDTO = (databaseProduct: DatabaseProduct): ProductDTO => ({
    id: databaseProduct.id,
    name: databaseProduct.name,
    url: databaseProduct.url,
    currency: databaseProduct.currency as Currency,
    price: databaseProduct.price,
    shopStatus: databaseProduct.shopStatus as ProductShopStatus,
    platformId: databaseProduct.platformId,
    platform: databaseProduct.platform
        ? platformMapper.mapDatabasePlatformToPlatformDTO(databaseProduct.platform)
        : null,
    userId: databaseProduct.userId,
    user: databaseProduct.user ? userMapper.mapDatabaseUserToUserDTO(databaseProduct.user) : null,
    scrapedAt: databaseProduct.scrapedAt,
    createdAt: databaseProduct.createdAt,
    updatedAt: databaseProduct.updatedAt,
    deletedAt: databaseProduct.deletedAt || null,
});

export const productMapper = {
    mapDatabaseProductToProductDTO,
};
