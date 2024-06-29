import Image from 'next/image';
import LogoIcon from '../public/logo.svg';
import { FC } from 'react';
import { cn } from 'lib/cn';

interface LogoProps {
    className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
    return <Image src={LogoIcon} alt="p letter logo" className={cn('max-w-24 mx-auto', className)} />;
};
