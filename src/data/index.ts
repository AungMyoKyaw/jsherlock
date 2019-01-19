import raw from './data.json';

const data: { [index: string]: any } = raw;

const sites: string[] = new Array(...Object.keys(data));

const siteInfo = (siteName: string): { [index: string]: string } => {
  return data[siteName];
};

export { sites, siteInfo };
