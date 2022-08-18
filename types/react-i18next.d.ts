import { localesType } from '../config/i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: localesType;
  }
}
