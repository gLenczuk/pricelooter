'use client';
import { ApplicationErrorDTO, CreateUserRequest, CreateUserResponse } from '@pricelooter/types';
import { useMutation } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { useState } from 'react';

interface UseCreateUserMutationProps {
    onSuccess?: (response: CreateUserResponse) => void;
    onError?: (errors: ApplicationErrorDTO[]) => void;
}

export const useCreateUserMutation = (props?: UseCreateUserMutationProps) => {
    const [error, setError] = useState<ApplicationErrorDTO | null>(null);

    const createUserRequest = async (body: CreateUserRequest) => {
        const response = await agent.post<CreateUserResponse>('/api/v1/users', body);

        return response.data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: createUserRequest,
        onSuccess: response => {
            setError(null);
            if (props.onSuccess) props.onSuccess(response);
        },
        onError: (errors: ApplicationErrorDTO[]) => {
            setError(errors[0]);
            if (props.onError) props.onError(errors);
        },
    });

    return {
        createUser: mutate,
        isCreatingUser: isPending,
        createUserError: error,
    };
};
