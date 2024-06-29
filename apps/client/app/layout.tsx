import '../globals.css';
import { FC, ReactNode } from 'react';
import { inter } from '../fonts';

interface Props {
    children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
    return (
        <html lang="en" className={inter.className}>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
