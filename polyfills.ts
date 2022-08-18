import './wdyr';
import { Platform } from 'react-native';
import 'react-native-get-random-values';

if (Platform.OS === 'web') {
  (function () {
    const cors_api_host = 'cors-anywhere.herokuapp.com';
    const cors_api_url = 'https://' + cors_api_host + '/';
    const slice = [].slice;
    const origin = window.location.protocol + '//' + window.location.host;
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
      // eslint-disable-next-line prefer-rest-params
      const args = slice.call(arguments);
      const targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      if (
        targetOrigin &&
        targetOrigin[0].toLowerCase() !== origin &&
        targetOrigin[1] !== cors_api_host
      ) {
        //@ts-ignore
        args[1] = cors_api_url + args[1];
      }
      //@ts-ignore
      return open.apply(this, args);
    };
  })();
}
