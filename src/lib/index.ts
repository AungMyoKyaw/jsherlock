import * as request from 'request-promise-native';

import { siteInfo } from '../data';
import { Imessage } from '../';

const checker = (siteName: string, userName: string): Promise<Imessage> => {
  return new Promise<Imessage>(async (resolve, reject) => {
    let exist = false;
    let uri: string = siteInfo(siteName).url.replace(/{}/gi, userName);
    let statusCode, body;
    try {
      let response = await request.get({
        uri,
        resolveWithFullResponse: true
      });
      [statusCode, body] = [response.statusCode, response.body];
    } catch (e) {
      [statusCode, body] = [e.statusCode, e.body];
    }
    console.log({ statusCode, uri });

    resolve({
      userName,
      siteName,
      uri,
      exist
    });
  });
};

export { checker };
