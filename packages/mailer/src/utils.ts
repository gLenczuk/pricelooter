import { EmailType } from './types';

export const subjectsPerEmailType = {
    [EmailType.USER_ACTIVATION]: 'Welcome to Pricelooter!',
    [EmailType.PASSWORD_RESET]: 'Reset your password.',
    [EmailType.PRODUCT_PRICE_NOTIFICATION]: 'Product price changed',
};

export const emailTemplatesByType = {
    [EmailType.USER_ACTIVATION]: 'activate_user.ejs',
    [EmailType.PASSWORD_RESET]: 'reset_password.ejs',
    [EmailType.PRODUCT_PRICE_NOTIFICATION]: 'product_price_notification.ejs',
};
