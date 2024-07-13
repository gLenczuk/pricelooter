'use client';

import { ForgotPasswordNotificationConfirmation } from 'components/confirmations/ForgotPasswordNotificationConfirmation';
import { ResetPasswordConfirmation } from 'components/confirmations/ResetPasswordConfirmation';
import { ForgotPasswordNotificationForm } from 'components/forms/ForgotPasswordNotificationForm';
import { ResetPasswordForm } from 'components/forms/ResetPasswordForm';
import { Logo } from 'components/Logo';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();

    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    const [isForgotPasswordNotificationSent, setForgotPasswordNotificationSent] = useState(false);
    const [isPasswordResetSent, setPasswordResetSent] = useState(false);

    if (isForgotPasswordNotificationSent) {
        return (
            <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
                <ForgotPasswordNotificationConfirmation />
            </main>
        );
    }

    if (isPasswordResetSent) {
        return (
            <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
                <ResetPasswordConfirmation />
            </main>
        );
    }

    if (token && userId) {
        return (
            <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
                <section>
                    <Logo />
                    <ResetPasswordForm
                        onSuccess={() => setPasswordResetSent(true)}
                        token={token}
                        userId={Number(userId)}
                    />
                </section>
            </main>
        );
    }

    return (
        <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
            <section>
                <Logo />
                <ForgotPasswordNotificationForm onSuccess={() => setForgotPasswordNotificationSent(true)} />
            </section>
        </main>
    );
};

export default ResetPasswordPage;
