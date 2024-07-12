import { GetCurrentUserResponse } from '@pricelooter/types';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Dashboard } from 'components/Dashboard';
import { agent } from 'http/agent';
import { parseServerCookies } from 'http/utils';
import { GET_USER_PRODUCTS_QUERY_KEY } from 'queries/keys';

const getProductsServerRequest = async () => {
    const response = await agent.get<GetCurrentUserResponse>('/api/v1/products/me', {
        headers: {
            Cookie: parseServerCookies(),
        },
        params: {
            page: 1,
        },
    });

    return response.data;
};

const DashboardPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryFn: getProductsServerRequest,
        queryKey: [GET_USER_PRODUCTS_QUERY_KEY, 1],
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Dashboard />
        </HydrationBoundary>
    );
};

export default DashboardPage;
