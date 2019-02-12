import axios from 'axios';

import { UAstring, siteInfo } from '../data';
import { Imessage } from '../';

const checker = async (siteName: string, userName: string) => {
  const site = siteInfo(siteName);
  let exist: boolean = true;
  let uri: string = '';
  let response, statusCode, body, responseUrl;

  try {
    //check url
    uri = site.url.replace(/{}/gi, userName);

    response = await axios({
      method: 'get',
      url: uri,
      headers: {
        'User-Agent': UAstring
      },
      validateStatus: status => {
        return status ? true : false;
      }
    });

    [statusCode, body, responseUrl] = [
      response.status,
      response.data,
      response.request.res.responseUrl
    ];

    switch (site.errorType) {
      case 'status_code':
        exist = statusCode != 404;
        break;
      case 'message':
        const { errorMsg } = site;
        const errorMsgRegex = new RegExp(errorMsg, 'g');
        exist = typeof body == 'string' ? !body.match(errorMsgRegex) : true;
        break;
      case 'response_url':
        const { errorUrl } = site;
        exist = responseUrl != errorUrl;
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
