import { Language } from '@pricelooter/types';

export const getRequestLanguage = (requestedLanguage?: unknown): Language => {
    if (!requestedLanguage || typeof requestedLanguage !== 'string') return 'pl';

    const availableLanguages = ['en', 'pl'];
    const isRequestedLanguageAvailable = availableLanguages.includes(requestedLanguage);

    return isRequestedLanguageAvailable ? (requestedLanguage as Language) : 'pl';
};
