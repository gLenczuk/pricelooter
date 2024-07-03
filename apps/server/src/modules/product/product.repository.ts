import { prisma } from '../../libs/database';
import { productMapper } from './product.mapper';
import {
    CreateDatabaseProductQuery,
    FindOneDatabaseProductQuery,
    FindManyDatabaseProuductsQuery,
    UpdateOneDatabaseProductQuery,
} from './product.types';

const create = async (query: CreateDatabaseProductQuery) => {
    const product = await prisma.product.create({
        data: {
            name: query.name,
            url: query.url,
            price: query.price,
            currency: query.currency,
            shopStatus: query.shopStatus,
            platform: {
                connect: {
                    id: query.platformId,
                },
            },
            user: {
                connect: {
                    id: query.userId,
                },
            },
        },
    });

    return productMapper.mapDatabaseProductToProductDTO(product);
};

const findOne = async (query: FindOneDatabaseProductQuery) => {
    const product = await prisma.product.findUnique({
        where: {
            id: query.id,
        },
    });

    return product ? productMapper.mapDatabaseProductToProductDTO(product) : null;
};

const findMany = async (query?: FindManyDatabaseProuductsQuery) => {
    const products = await prisma.product.findMany({
        where: {
            url: query?.filter?.url,
            userId: query?.filter?.userId,
            scrapedAt: {
                gte: query?.filter?.scrapedAt?.expression === 'gte' ? query.filter.scrapedAt.value : undefined,
                lte: query?.filter?.scrapedAt?.expression === 'lte' ? query.filter.scrapedAt.value : undefined,
            },
        },
    });

    return products.map(productMapper.mapDatabaseProductToProductDTO);
};

const updateOne = async (query: UpdateOneDatabaseProductQuery) => {
    const product = await prisma.product.update({
        where: {
            id: query.filter.id,
        },
        data: query.data,
    });

    return productMapper.mapDatabaseProductToProductDTO(product);
};

export const productRepository = {
    create,
    findOne,
    findMany,
    updateOne,
};
