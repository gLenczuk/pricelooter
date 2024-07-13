import { Card, CardHeader, CardTitle, CardContent } from 'components/core/Card';
import Link from 'next/link';

export const ResetPasswordConfirmation = () => {
    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-xl text-center">Done!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
                <p className="text-center">Your password has changed. You can log in now.</p>
                <Link href="/" className="underline mt-8 text-primary">
                    Log in
                </Link>
            </CardContent>
        </Card>
    );
};
