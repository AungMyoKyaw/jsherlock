import axios, { AxiosError } from 'axios';

import { UAstring, siteInfo, ErrorType } from '../data';
import { Imessage } from '../';

export class JsherLockError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JsherLockError';
  }
}

export class SiteNotFoundError extends JsherLockError {
  constructor(siteName: string) {
    super(`Site "${siteName}" is not supported`);
    this.name = 'SiteNotFoundError';
  }
}

export class NetworkError extends JsherLockError {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'NetworkError';
  }
}

const handleStatusCodeError = (statusCode: number): boolean => {
  return statusCode !== 404;
};

const handleMessageError = (body: unknown, errorMsg: string): boolean => {
  if (typeof body !== 'string') {
    return true;
  }
  const errorMsgRegex = new RegExp(errorMsg, 'g');
  return !errorMsgRegex.test(body);
};

const handleResponseUrlError = (responseUrl: string, errorUrl: string): boolean => {
  return responseUrl !== errorUrl;
};

const checker = async (siteName: string, userName: string): Promise<Imessage> => {
  let site;
  try {
    site = siteInfo(siteName);
  } catch (error) {
    throw new SiteNotFoundError(siteName);
  }

  let exist: boolean = true;
  let uri: string = '';

  try {
    uri = site.url.replace(/{}/gi, userName);

    const response = await axios({
      method: 'get',
      url: uri,
      headers: {
        'User-Agent': UAstring
      },
      validateStatus: () => true,
      timeout: 30000
    });

    const statusCode = response.status;
    const body = response.data;
    const responseUrl = response.request.res.responseUrl as string;

    switch (site.errorType) {
      case 'status_code':
        exist = handleStatusCodeError(statusCode);
        break;
      case 'message':
        if (site.errorMsg) {
          exist = handleMessageError(body, site.errorMsg);
        }
        break;
      case 'response_url':
        if (site.errorUrl) {
          exist = handleResponseUrlError(responseUrl, site.errorUrl);
        }
        break;
      default:
        exist = handleStatusCodeError(statusCode);
        break;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new NetworkError(
        `Failed to check ${siteName}: ${error.message}`,
        error
      );
    }
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
