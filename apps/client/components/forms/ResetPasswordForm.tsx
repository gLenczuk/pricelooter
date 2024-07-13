'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { UserUpdateOperation } from '@pricelooter/types';
import { ResetPasswordSchema } from '@pricelooter/validator';
import { Alert, AlertTitle, AlertDescription } from 'components/core/Alert';
import { Button } from 'components/core/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'components/core/Card';
import { Input } from 'components/core/Input';
import { Label } from 'components/core/Label';
import { AlertCircle } from 'lucide-react';
import { useResetPasswordMutation } from 'mutations/useResetPasswordMutation';
import { FC, FormEvent } from 'react';
import { useForm } from 'react-hook-form';

interface ResetPasswordFormProps {
    token: string;
    userId: number;
    onSuccess?: () => void;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onSuccess, token, userId }) => {
    const { resetPassword, isResettingPassword, resetPasswordError } = useResetPasswordMutation({
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
        resolver: yupResolver(ResetPasswordSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormData('operation', UserUpdateOperation.ResetPassword);
        setFormData('data.token', token);
        setFormData('data.userId', userId);

        const isFormValid = await validateForm();
        if (!isFormValid) return;

        const { data } = getFormData();
        resetPassword({
            operation: UserUpdateOperation.ResetPassword,
            data: {
                newPassword: data.newPassword,
                token: data.token,
                userId: data.userId,
            },
        });
    };

    return (
        <Card className="max-w-md min-w-[320px] w-full">
            <CardHeader>
                <CardTitle className="text-xl">Reset password</CardTitle>
                <CardDescription className="text-md">Set your new password.</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="mt-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('data.newPassword')}
                                error={formErrors.data?.newPassword?.message}
                            />
                        </div>
                        <div className="mt-4">
                            {resetPasswordError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{resetPasswordError.message}</AlertDescription>
                                </Alert>
                            )}
                            <Button disabled={isResettingPassword} type="submit" className="w-full mt-2">
                                Continue
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
};
