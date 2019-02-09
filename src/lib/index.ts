import * as request from 'request-promise-native';

import { UAstring, siteInfo } from '../data';
import { Imessage } from '../';

const checker = async (siteName: string, userName: string) => {
  let exist: boolean = true;
  const site = siteInfo(siteName);
  let uri: string = '';
  let statusCode, body, href;
  //check url
  try {
    uri = site.url.replace(/{}/gi, userName);
  } catch (e) {
    throw new Error('SITE IS NOT SUPPORTED YET');
  }

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

  return {
    userName,
    siteName,
    uri,
    exist
  };
};

export { checker };
