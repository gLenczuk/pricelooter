'use client';
import { ApplicationErrorDTO, CreateProductRequest, CreateProductResponse } from '@pricelooter/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { GET_USER_PRODUCTS_QUERY_KEY } from 'queries/keys';
import { useState } from 'react';

interface UseCreateProductMutationProps {
    onSuccess?: (response: CreateProductResponse) => void;
    onError?: (errors: ApplicationErrorDTO[]) => void;
}

export const useCreateProductMutation = (props?: UseCreateProductMutationProps) => {
    const [error, setError] = useState<ApplicationErrorDTO | null>(null);
    const queryClient = useQueryClient();

    const createProductRequest = async (body: CreateProductRequest) => {
        const response = await agent.post<CreateProductResponse>('/api/v1/products', body);

        return response.data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: createProductRequest,
        onSuccess: async response => {
            setError(null);
            await queryClient.invalidateQueries({ queryKey: [GET_USER_PRODUCTS_QUERY_KEY] });

            if (props.onSuccess) props.onSuccess(response);
        },
        onError: (errors: ApplicationErrorDTO[]) => {
            setError(errors[0]);
            if (props.onError) props.onError(errors);
        },
    });

    return {
        createProduct: mutate,
        isCreatingProduct: isPending,
        createProductError: error,
    };
};
