import Image from 'next/image';
import LogoIcon from '../public/logo.svg';

export const Logo = () => {
    return <Image src={LogoIcon} alt="p letter logo" className="max-w-24 mx-auto" />;
};
