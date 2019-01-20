import * as request from 'request-promise-native';

import { UAstring, siteInfo } from '../data';
import { Imessage } from '../';

const checker = (siteName: string, userName: string): Promise<Imessage> => {
  return new Promise<Imessage>(async (resolve, reject) => {
    const site = siteInfo(siteName);
    let exist: boolean = true;
    let uri: string = site.url.replace(/{}/gi, userName);
    let statusCode, body, href;
    try {
      let response = await request.get({
        uri,
        headers: {
          'User-Agent': UAstring
        },
        resolveWithFullResponse: true
      });
      [statusCode, body, href] = [
        response.statusCode,
        response.body,
        response.request.uri.href
      ];
    } catch (e) {
      [statusCode, body] = [e.statusCode, e.body];
    }

    switch (site.errorType) {
      case 'status_code':
        exist = statusCode != 404;
        break;
      case 'message':
        try {
          const { errorMsg } = site;
          const errorMsgRegex = new RegExp(errorMsg, 'g');
          exist = !body.match(errorMsgRegex);
        } catch (e) {}
        break;
      case 'response_url':
        try {
          const { errorUrl } = site;
          exist = href != errorUrl;
        } catch (e) {}
        break;
      default:
        exist = statusCode != 404;
        break;
    }
    resolve({
      userName,
      siteName,
      uri,
      exist
    });
  });
};

export { checker };
