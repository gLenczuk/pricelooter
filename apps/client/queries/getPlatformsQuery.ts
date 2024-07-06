import { GetPlatformsResponse } from '@pricelooter/types';
import { useQuery } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { GET_PLATFORMS_QUERY_KEY } from './keys';

export const usePlatformsQuery = () => {
    const getPlatformsRequest = async () => {
        const response = await agent.get<GetPlatformsResponse>('/api/v1/platforms');

        return response.data;
    };

    const { data, isLoading } = useQuery({
        queryFn: getPlatformsRequest,
        queryKey: [GET_PLATFORMS_QUERY_KEY],
    });

    return {
        platforms: data?.body?.platforms,
        isLoadingPlatforms: isLoading,
    };
};
