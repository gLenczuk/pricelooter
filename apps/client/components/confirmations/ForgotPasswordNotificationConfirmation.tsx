import { Card, CardHeader, CardTitle, CardContent } from 'components/core/Card';

export const ForgotPasswordNotificationConfirmation = () => {
    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-xl text-center">Almost done!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
                <p className="text-center">We have sent you an email. Follow the instructions to set a new password.</p>
            </CardContent>
        </Card>
    );
};
