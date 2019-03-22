/*
 *
 * LanguageProvider actions
 *
 */

import CHANGE_LOCALE from './constants';

function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export default changeLocale;
