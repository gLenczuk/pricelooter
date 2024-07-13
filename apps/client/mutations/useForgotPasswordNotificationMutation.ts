'use client';
import { ApplicationErrorDTO, EmptyResponse, SendForgotPasswordEmailRequest } from '@pricelooter/types';
import { useMutation } from '@tanstack/react-query';
import { agent } from 'http/agent';
import { useState } from 'react';

interface UseForgotPasswordMutationProps {
    onSuccess?: (response: EmptyResponse) => void;
    onError?: (errors: ApplicationErrorDTO[]) => void;
}

export const useForgotPasswordNotificationMutation = (props?: UseForgotPasswordMutationProps) => {
    const [error, setError] = useState<ApplicationErrorDTO | null>(null);

    const forgotPasswordRequest = async (body: SendForgotPasswordEmailRequest) => {
        const response = await agent.post<EmptyResponse>('/api/v1/notifications', body);

        return response.data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: forgotPasswordRequest,
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
        sendForgotPasswordNotification: mutate,
        isSendingForgotPasswordNotification: isPending,
        forgotPasswordNotificationError: error,
    };
};
