import * as request from 'request-promise-native';

import { UAstring, siteInfo } from '../data';
import { Imessage } from '../';

const checker = async (siteName: string, userName: string) => {
  let exist: boolean = true;
  let uri: string = '';
  try {
    const site = siteInfo(siteName);
    let statusCode, body, href;

    //check url
    uri = site.url.replace(/{}/gi, userName);

    let response = await request.get({
      uri,
      headers: {
        'User-Agent': UAstring
      },
      resolveWithFullResponse: true,
      simple: false,
      timeout: 20e3
    });
    [statusCode, body, href] = [
      response.statusCode,
      response.body,
      response.request.uri.href
    ];

    switch (site.errorType) {
      case 'status_code':
        exist = statusCode != 404;
        break;
      case 'message':
        const { errorMsg } = site;
        const errorMsgRegex = new RegExp(errorMsg, 'g');
        exist = !body.match(errorMsgRegex);
        break;
      case 'response_url':
        const { errorUrl } = site;
        exist = href != errorUrl;
        break;
      default:
        exist = statusCode != 404;
        break;
    }
  } catch (e) {
    exist = false;
  }

  return {
    userName,
    siteName,
    uri,
    exist
  };
};

export { checker };
