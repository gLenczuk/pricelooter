'use client';
import { ApplicationErrorDTO, EmptyResponse } from '@pricelooter/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { useRouter } from 'next/navigation';
import { GET_CURRENT_USER_QUERY_KEY } from 'queries/keys';
import { useState } from 'react';

interface UseLogoutUserMutationProps {
    onSuccess?: (response: EmptyResponse) => void;
    onError?: (errors: ApplicationErrorDTO[]) => void;
}

export const useLogoutUserMutation = (props?: UseLogoutUserMutationProps) => {
    const [error, setError] = useState<ApplicationErrorDTO | null>(null);
    const queryClient = useQueryClient();
    const router = useRouter();

    const logoutUserRequest = async () => {
        const response = await agent.delete<EmptyResponse>('/api/v1/sessions/me');

        return response.data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: logoutUserRequest,
        onSuccess: async response => {
            setError(null);
            await queryClient.resetQueries({ queryKey: [GET_CURRENT_USER_QUERY_KEY] });

            router.push('/');

            if (props.onSuccess) props.onSuccess(response);
        },
        onError: (errors: ApplicationErrorDTO[]) => {
            setError(errors[0]);
            if (props.onError) props.onError(errors);
        },
    });

    return {
        logoutUser: mutate,
        isLoggingOutUser: isPending,
        logoutUserError: error,
    };
};
