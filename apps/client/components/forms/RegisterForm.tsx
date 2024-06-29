import { Button } from 'components/core/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'components/core/Card';
import { Input } from 'components/core/Input';
import { Label } from 'components/core/Label';
import Link from 'next/link';

export const RegisterForm = () => {
    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription className="text-md">Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Create an account
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
