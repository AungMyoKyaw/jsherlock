import { sites as rawSites } from './data';
import { checker } from './lib';

//checking status mesasge interface
interface Imessage {
  userName: string;
  siteName: string;
  uri: string;
  exist: boolean;
}

class JsherLock {
  private userName: string;
  private sites: string[];

  constructor(userName: string) {
    this.userName = userName;
    this.sites = new Array(...rawSites);
  }

  static sites(): string[] {
    return rawSites;
  }

  async checkAll(): Promise<Imessage[]> {
    const messages = await Promise.all(
      rawSites.map(async siteName => {
        const message = await this.checkFor(siteName);
        return message;
      })
    );
    return messages;
  }

  async checkFor(siteName: string): Promise<Imessage> {
    const message = await checker(siteName, this.userName);
    return message;
  }
}

export default JsherLock;

export { Imessage };

module.exports = JsherLock;
module.exports.default = JsherLock;
