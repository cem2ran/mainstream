import { BackendModule, CallbackError } from 'i18next';

import * as config from '../../config/i18n';
import type { namespaces } from '../../config/i18n';

const translationLoader: BackendModule = {
  type: 'backend',
  init: () => {},
  async read(language, namespace: namespaces, callback) {
    let resource,
      error = null;
    try {
      const src = await config.supportedLocales[language].translationFileLoader();

      resource = src[namespace];
    } catch (_error) {
      error = _error as CallbackError;
    }
    callback(error, resource);
  },
};
export default translationLoader;
