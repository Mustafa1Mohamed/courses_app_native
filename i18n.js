import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './src/languages/en.json';
import ar from './src/languages/ar.json';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Localization.getLocales()[0].languageCode.startsWith('ar') ? 'ar' : 'en',
        fallbackLng: 'en',
        supportedLngs: ['en', 'ar'],
        compatibilityJSON: 'v3',
        debug: false,
        interpolation: { escapeValue: false },
    });

I18nManager.allowRTL(true);

i18n.on('languageChanged', (lng) => {
    if (lng === 'ar') {
        I18nManager.forceRTL(true);
    } else {
        I18nManager.forceRTL(false);
    }
});

export default i18n;
