import { Logo } from 'components/Logo';
import { RegisterForm } from 'components/forms/RegisterForm';

const RegisterPage = () => {
    return (
        <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
            <section>
                <Logo />
                <RegisterForm />
            </section>
        </main>
    );
};

export default RegisterPage;
