import raw from './data.json';

interface IsiteInfo {
  [index: string]: string;
}

interface Idata {
  [index: string]: IsiteInfo;
}

const data: Idata = raw;

const sites: string[] = new Array(...Object.keys(data));

const siteInfo = (siteName: string): IsiteInfo => {
  return data[siteName];
};

const UAstring =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';

export { sites, siteInfo, UAstring };
