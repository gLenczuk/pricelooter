import { UserDTO, UserStatus } from '@pricelooter/types';
import Prisma from '@prisma/client';
import { productMapper } from '../product/product.mapper';

type DatabaseUserWithRelations = Prisma.User & { products?: Prisma.Product[] };

const mapDatabaseUserToUserDTO = (databaseUser: DatabaseUserWithRelations): UserDTO => ({
    id: databaseUser.id,
    username: databaseUser.username,
    email: databaseUser.email,
    password: databaseUser.password,
    status: databaseUser.status as UserStatus,
    products: databaseUser.products ? databaseUser.products.map(productMapper.mapDatabaseProductToProductDTO) : [],
    createdAt: databaseUser.createdAt,
    updatedAt: databaseUser.updatedAt,
    deletedAt: databaseUser.deletedAt || null,
});

export const userMapper = {
    mapDatabaseUserToUserDTO,
};
