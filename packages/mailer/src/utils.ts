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
};

export const emailTemplatesByType = {
    [EmailType.USER_ACTIVATION]: 'activate_user.ejs',
    [EmailType.PASSWORD_RESET]: 'reset_password.ejs',
};
