'use client';
import { ApplicationErrorDTO, DeleteProductRequest } from '@pricelooter/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { GET_USER_PRODUCTS_QUERY_KEY } from 'queries/keys';
import { useState } from 'react';

interface UseDeleteProductMutationProps {
    onSuccess?: () => void;
    onError?: (errors: ApplicationErrorDTO[]) => void;
}

export const useDeleteProductMutation = (props?: UseDeleteProductMutationProps) => {
    const [error, setError] = useState<ApplicationErrorDTO | null>(null);
    const queryClient = useQueryClient();

    const deleteProductRequest = async (body: DeleteProductRequest) => {
        await agent.delete(`/api/v1/products/${body.productId}`);

        return {};
    };

    const { mutate, isPending } = useMutation({
        mutationFn: deleteProductRequest,
        onSuccess: async () => {
            setError(null);
            await queryClient.invalidateQueries({ queryKey: [GET_USER_PRODUCTS_QUERY_KEY] });

            if (props.onSuccess) props.onSuccess();
        },
        onError: (errors: ApplicationErrorDTO[]) => {
            setError(errors[0]);
            if (props.onError) props.onError(errors);
        },
    });

    return {
        deleteProduct: mutate,
        isDeletingProduct: isPending,
        deleteProductError: error,
    };
};
