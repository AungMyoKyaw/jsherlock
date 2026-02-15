import raw from './data.json';

export type ErrorType = 'status_code' | 'message' | 'response_url';

export interface ISiteInfo {
  url: string;
  urlMain: string;
  errorType: ErrorType;
  errorMsg?: string;
  errorUrl?: string;
  regexCheck?: string;
  noPeriod?: string;
}

export interface IData {
  [siteName: string]: ISiteInfo;
}

const data: IData = raw;

const sites: string[] = Object.keys(data);

const siteInfo = (siteName: string): ISiteInfo => {
  if (!data[siteName]) {
    throw new Error(`Site "${siteName}" is not supported`);
  }
  return data[siteName];
};

const UAstring =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';

export { sites, siteInfo, UAstring };
