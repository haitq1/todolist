import i18n from 'i18n-js';
import locales from './locales';
import language from '../screens/Home/HomeV';

i18n.defaultLocale = language;
i18n.locale = language;
i18n.fallbacks = true;
i18n.translations = locales;
i18n.missingBehaviour = 'guess';

export default i18n;
