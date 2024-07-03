import { prisma } from '../../libs/database';
import { platformMapper } from './platform.mapper';
import {
    CreateDatabasePlatformQuery,
    FindOneDatabasePlatformQuery,
    FindManyDatabasePlatformsQuery,
} from './platform.types';

const create = async (query: CreateDatabasePlatformQuery) => {
    const platform = await prisma.platform.create({
        data: {
            name: query.name,
            url: query.url,
            category: query.category,
        },
    });

    return platformMapper.mapDatabasePlatformToPlatformDTO(platform);
};

const findOne = async (query: FindOneDatabasePlatformQuery) => {
    const platform = await prisma.platform.findUnique({
        where: {
            id: query.id,
            name: query.name,
        },
    });

    return platform ? platformMapper.mapDatabasePlatformToPlatformDTO(platform) : null;
};

const findMany = async (query: FindManyDatabasePlatformsQuery) => {
    const platforms = await prisma.platform.findMany({
        where: {
            id: {
                in: query.filter?.ids,
            },
        },
    });

    return platforms.map(platformMapper.mapDatabasePlatformToPlatformDTO);
};

export const platformRepository = {
    create,
    findOne,
    findMany,
};
