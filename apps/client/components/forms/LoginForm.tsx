'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthenticateUserSchema } from '@pricelooter/validator';
import { Alert, AlertTitle, AlertDescription } from 'components/core/Alert';
import { Button } from 'components/core/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'components/core/Card';
import { Input } from 'components/core/Input';
import { Label } from 'components/core/Label';
import { AlertCircle } from 'lucide-react';
import { useAuthenticateUserMutation } from 'mutations/authenticateUserMutation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCurrentUserQuery } from 'queries/getCurrentUserQuery';
import { FormEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
    const { user, isLoadingUser } = useCurrentUserQuery();
    const router = useRouter();

    const { authenticateUser, isAuthenticatingUser, authenticateUserError } = useAuthenticateUserMutation({
        onSuccess: async () => {
            router.push('/dashboard');
        },
    });

    const {
        register,
        formState: { errors: formErrors },
        trigger: validateForm,
        getValues: getFormData,
    } = useForm({
        resolver: yupResolver(AuthenticateUserSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isFormValid = await validateForm();
        if (!isFormValid) return;

        const data = getFormData();
        authenticateUser({
            email: data.email ?? '',
            password: data.password ?? '',
        });
    };

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [router, user]);

    if (isLoadingUser || user) return null;

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="mt-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email')}
                                error={formErrors.email?.message}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                error={formErrors.password?.message}
                            />
                        </div>
                        <div className="mt-4">
                            {authenticateUserError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{authenticateUserError.message}</AlertDescription>
                                </Alert>
                            )}
                            <Button disabled={isAuthenticatingUser} type="submit" className="w-full mt-2">
                                Login
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
};
