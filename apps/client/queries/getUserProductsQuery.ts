import { GetProductsResponse } from '@pricelooter/types';
import { useQuery } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { GET_USER_PRODUCTS_QUERY_KEY } from './keys';

interface UseUserProductsQueryOptions {
    page: number;
}

export const useUserProductsQuery = (options: UseUserProductsQueryOptions) => {
    const getProductsRequest = async (page: number) => {
        const response = await agent.get<GetProductsResponse>('/api/v1/products/me', {
            params: {
                page,
            },
        });

        return response.data;
    };

    const { data, isLoading } = useQuery({
        queryFn: () => getProductsRequest(options.page),
        queryKey: [GET_USER_PRODUCTS_QUERY_KEY, options.page],
    });

    return {
        products: data?.body?.products,
        isLoadingProducts: isLoading,
        meta: data?.meta,
    };
};
