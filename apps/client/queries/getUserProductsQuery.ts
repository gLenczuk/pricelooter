import { GetProductsResponse } from '@pricelooter/types';
import { useQuery } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { GET_USER_PRODUCTS_QUERY_KEY } from './keys';

export const useUserProductsQuery = () => {
    const getProductsRequest = async () => {
        const response = await agent.get<GetProductsResponse>('/api/v1/products/me');

        return response.data;
    };

    const { data, isLoading } = useQuery({
        queryFn: getProductsRequest,
        queryKey: [GET_USER_PRODUCTS_QUERY_KEY],
    });

    return {
        products: data?.body?.products,
        isLoadingProducts: isLoading,
    };
};
