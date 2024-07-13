import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../core/Card';

export const RegisterConfirmation = () => {
    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-xl text-center">Almost done!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
                <p className="text-center">
                    We have sent you an activation email. Follow the instructions to finish registration process.
                </p>
                <Link href="/" className="underline mt-8 text-primary">
                    Log in
                </Link>
            </CardContent>
        </Card>
    );
};
