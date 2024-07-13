'use client';
import { ApplicationErrorDTO, ResetPasswordRequest, UpdateUserResponse } from '@pricelooter/types';
import { useMutation } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { useState } from 'react';

interface UseResetPasswordMutationProps {
    onSuccess?: (response: UpdateUserResponse) => void;
    onError?: (errors: ApplicationErrorDTO[]) => void;
}

export const useResetPasswordMutation = (props?: UseResetPasswordMutationProps) => {
    const [error, setError] = useState<ApplicationErrorDTO | null>(null);

    const resetPasswordRequest = async (body: ResetPasswordRequest) => {
        const response = await agent.patch<UpdateUserResponse>('/api/v1/users/me', body);

        return response.data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: resetPasswordRequest,
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
        resetPassword: mutate,
        isResettingPassword: isPending,
        resetPasswordError: error,
    };
};
