import day from 'dayjs';

import * as config from '../../config/i18n';

export default {
  init(locale: string) {
    return new Promise((resolve, reject) => {
      config.supportedLocales[locale]
        .dateLocaleLoader()
        .then(() => {
          day.locale(locale);
          return resolve(void 0);
        })
        .catch((err) => reject(err));
    });
  },
  format(date: Date, format: string | undefined) {
    return day(date).format(format);
  },
};
