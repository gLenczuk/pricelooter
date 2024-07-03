import { platformRepository } from './platform.repository';
import {
    CreateDomainPlatformParams,
    FindManyDomainPlatformsParams,
    FindUniqueDomainPlatformParams,
} from './platform.types';

const createPlatform = async (params: CreateDomainPlatformParams) => {
    return platformRepository.create({
        name: params.name,
        url: params.url,
        category: params.category,
    });
};

const findUniquePlatform = async (params: FindUniqueDomainPlatformParams) => {
    return platformRepository.findOne({
        id: params.id,
        name: params.name,
    });
};

const findManyPlatforms = async (params?: FindManyDomainPlatformsParams) => {
    return platformRepository.findMany({
        filter: {
            ids: params?.filter?.ids,
        },
    });
};

export const platformService = {
    createPlatform,
    findUniquePlatform,
    findManyPlatforms,
};
