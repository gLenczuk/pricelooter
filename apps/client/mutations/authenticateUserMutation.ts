'use client';
import { ApplicationErrorDTO, AuthenticateUserRequest, AuthenticateUserResponse } from '@pricelooter/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { GET_CURRENT_USER_QUERY_KEY } from 'queries/keys';
import { useState } from 'react';

interface UseAuthenticateUserMutationProps {
    onSuccess?: (response: AuthenticateUserResponse) => void;
    onError?: (errors: ApplicationErrorDTO[]) => void;
}

export const useAuthenticateUserMutation = (props?: UseAuthenticateUserMutationProps) => {
    const [error, setError] = useState<ApplicationErrorDTO | null>(null);
    const queryClient = useQueryClient();

    const authenticateUserRequest = async (body: AuthenticateUserRequest) => {
        const response = await agent.post<AuthenticateUserResponse>('/api/v1/sessions', body);

        return response.data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: authenticateUserRequest,
        onSuccess: async response => {
            setError(null);
            await queryClient.invalidateQueries({ queryKey: [GET_CURRENT_USER_QUERY_KEY] });

            if (props.onSuccess) props.onSuccess(response);
        },
        onError: (errors: ApplicationErrorDTO[]) => {
            setError(errors[0]);
            if (props.onError) props.onError(errors);
        },
    });

    return {
        authenticateUser: mutate,
        isAuthenticatingUser: isPending,
        authenticateUserError: error,
    };
};
