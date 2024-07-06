'use client';
import { Alert, AlertDescription, AlertTitle } from 'components/core/Alert';
import { Button } from 'components/core/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'components/core/Card';
import { Input } from 'components/core/Input';
import { Label } from 'components/core/Label';
import { AlertCircle } from 'lucide-react';
import { useCreateUserMutation } from 'mutations/createUserMutation';
import Link from 'next/link';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserSchema } from '@pricelooter/validator';

export const RegisterForm = () => {
    const { createUser, isCreatingUser, createUserError } = useCreateUserMutation();

    const {
        register,
        formState: { errors: formErrors },
        trigger: validateForm,
        getValues: getFormData,
    } = useForm({
        resolver: yupResolver(CreateUserSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isFormValid = await validateForm();
        if (!isFormValid) return;

        const data = getFormData();
        createUser({
            username: data.username ?? '',
            email: data.email ?? '',
            password: data.password ?? '',
        });
    };

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription className="text-md">Enter your information to create an account</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="mt-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" {...register('username')} error={formErrors.username?.message} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} error={formErrors.email?.message} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                error={formErrors.password?.message}
                            />
                        </div>
                        <div className="mt-4">
                            {createUserError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{createUserError.message}</AlertDescription>
                                </Alert>
                            )}
                            <Button disabled={isCreatingUser} type="submit" className="w-full mt-2">
                                Create an account
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
};
