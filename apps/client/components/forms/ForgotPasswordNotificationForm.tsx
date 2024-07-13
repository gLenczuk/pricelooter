'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SendNotificationType } from '@pricelooter/types';
import { SendForgotPasswordEmailSchema } from '@pricelooter/validator';
import { Alert, AlertTitle, AlertDescription } from 'components/core/Alert';
import { Button } from 'components/core/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/core/Card';
import { Input } from 'components/core/Input';
import { Label } from 'components/core/Label';
import { AlertCircle } from 'lucide-react';
import { useForgotPasswordNotificationMutation } from 'mutations/useForgotPasswordNotificationMutation';
import { FC, FormEvent } from 'react';
import { useForm } from 'react-hook-form';

interface ForgotPasswordFormProps {
    onSuccess?: () => void;
}

export const ForgotPasswordNotificationForm: FC<ForgotPasswordFormProps> = ({ onSuccess }) => {
    const { sendForgotPasswordNotification, isSendingForgotPasswordNotification, forgotPasswordNotificationError } =
        useForgotPasswordNotificationMutation({
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });

    const {
        register,
        formState: { errors: formErrors },
        trigger: validateForm,
        getValues: getFormData,
        setValue: setFormData,
    } = useForm({
        resolver: yupResolver(SendForgotPasswordEmailSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormData('type', SendNotificationType.ForgotPasswordEmail);

        const isFormValid = await validateForm();
        if (!isFormValid) return;

        const { data } = getFormData();
        sendForgotPasswordNotification({
            type: SendNotificationType.ForgotPasswordEmail,
            data: {
                email: data.email,
            },
        });
    };

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-xl">Forgot password?</CardTitle>
                <CardDescription className="text-md">
                    Nothing wrong with that. Give us your email, to which we will send a link to change your password.
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="mt-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('data.email')}
                                error={formErrors.data?.email?.message}
                            />
                        </div>
                        <div className="mt-4">
                            {forgotPasswordNotificationError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{forgotPasswordNotificationError.message}</AlertDescription>
                                </Alert>
                            )}
                            <Button
                                disabled={isSendingForgotPasswordNotification}
                                type="submit"
                                className="w-full mt-2"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
};
