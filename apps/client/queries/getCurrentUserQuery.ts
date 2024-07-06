import { GetCurrentUserResponse } from '@pricelooter/types';
import { useQuery } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { GET_CURRENT_USER_QUERY_KEY } from './keys';

export const useCurrentUserQuery = () => {
    const getUserRequest = async () => {
        const response = await agent.get<GetCurrentUserResponse>('/api/v1/sessions/me');

        return response.data;
    };

    const { data, isLoading } = useQuery({
        queryFn: getUserRequest,
        queryKey: [GET_CURRENT_USER_QUERY_KEY],
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return {
        user: data?.body?.user,
        isLoadingUser: isLoading,
    };
};
