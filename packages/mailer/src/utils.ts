import { EmailType } from './types';

export const subjectTranslations = {
    [EmailType.USER_ACTIVATION]: {
        pl: 'Witaj w Pricelooter!',
        en: 'Welcome to Pricelooter!',
    },
    [EmailType.PASSWORD_RESET]: {
        pl: 'Zresetuj swoje hasło.',
        en: 'Reset your password.',
    },
    [EmailType.PRODUCT_PRICE_NOTIFICATION]: {
        pl: 'Zmiana ceny produktu',
        en: 'Product price change',
    },
};

export const emailTemplatesByType = {
    [EmailType.USER_ACTIVATION]: 'activate_user.ejs',
    [EmailType.PASSWORD_RESET]: 'reset_password.ejs',
    [EmailType.PRODUCT_PRICE_NOTIFICATION]: 'product_price_notification.ejs',
};
