import { cookies } from 'next/headers';

export const parseServerCookies = () => {
    const cookie = cookies();
    const allCookies = cookie.getAll();

    return allCookies
        .map((cookie, i) =>
            i === allCookies.length - 1 ? `${cookie.name}=${cookie.value}` : `${cookie.name}=${cookie.value};`,
        )
        .join(' ');
};
