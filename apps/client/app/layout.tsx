import '../globals.css';
import { FC, ReactNode, Suspense } from 'react';
import { inter } from '../fonts';
import { ReactQueryProvider } from 'providers/ReactQueryProvider';
import { ToastProvider } from 'providers/ToastProvider';

interface Props {
    children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <Suspense>
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                    <ToastProvider />
                </Suspense>
            </body>
        </html>
    );
};

export default RootLayout;
