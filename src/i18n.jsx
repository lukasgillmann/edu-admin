import i18n from 'i18next';

import messages from "./i18n/index";

i18n.init({
    lng: "fr",
    fallbackLng: "uk", // use en if detected lng is not available
    // saveMissing: true, // send not translated keys to endpoint
    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
        escapeValue: false // react already safes from xss
    },
    resources: {
        uk: {
            common: messages.uk
        },
        fr: {
            common: messages.fr
        },
        de: {
            common: messages.de
        },
        'es-419': {
            common: messages['es-419']
        },
        'zh-CN': {
            common: messages['zh-CN']
        },
        ar: {
            common: messages.ar
        },
    }
});

export default i18n;