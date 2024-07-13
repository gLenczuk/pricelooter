'use client';
import { Logo } from 'components/Logo';
import { RegisterConfirmation } from 'components/confirmations/RegisterConfirmation';
import { RegisterForm } from 'components/forms/RegisterForm';
import { useState } from 'react';

const RegisterPage = () => {
    const [isRegisterCompleted, setRegisterCompleted] = useState(false);

    if (isRegisterCompleted) {
        return (
            <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
                <RegisterConfirmation />
            </main>
        );
    }

    return (
        <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
            <section>
                <Logo />
                <RegisterForm onSuccess={() => setRegisterCompleted(true)} />
            </section>
        </main>
    );
};

export default RegisterPage;
