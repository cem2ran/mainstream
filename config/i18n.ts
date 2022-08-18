import en from '../locales/en.json';
export const fallback = 'en';

export type localesType = typeof en;
export type namespaces = keyof localesType;
export const namespaces = Object.keys(en) as namespaces[];

export const supportedLocales: {
  [locale: string]: {
    name: string;
    translationFileLoader: () => Promise<localesType>;
    dateLocaleLoader: () => Promise<void>;
  };
} = {
  en: {
    name: 'English',
    translationFileLoader: () => require('../locales/en.json'),
    // en is default locale
    dateLocaleLoader: () => Promise.resolve(),
  },
  da: {
    name: 'Danish',
    translationFileLoader: () => require('../locales/da.json'),
    dateLocaleLoader: () => require('dayjs/locale/da'),
  },
};
export const defaultNamespace = 'common';
