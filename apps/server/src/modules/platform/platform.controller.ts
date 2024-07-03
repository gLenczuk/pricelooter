import { CreatePlatformRequest } from '@pricelooter/types';
import { ControllerRequest } from '../../types';
import { platformService } from './platform.service';
import { ExistingResourceError } from '@pricelooter/exceptions';

const createPlatform = async (req: ControllerRequest<CreatePlatformRequest>) => {
    const { name, url, category } = req.body;

    const platform = await platformService.findUniquePlatform({ name });

    if (platform) {
        throw new ExistingResourceError({
            message: 'Platform with given name already exists.',
            key: 'platform_already_exists',
        });
    }

    return platformService.createPlatform({
        name,
        category,
        url,
    });
};

const getPlatforms = async () => {
    return platformService.findManyPlatforms();
};

export const platformController = {
    createPlatform,
    getPlatforms,
};
