import { Logo } from 'components/Logo';
import { LoginForm } from 'components/forms/LoginForm';

const Home = () => {
    return (
        <main className="h-screen w-screen flex items-center justify-center bg-gray-50 px-2">
            <section>
                <Logo />
                <LoginForm />
            </section>
        </main>
    );
};

export default Home;
