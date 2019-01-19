import { sites as rawSites } from './data';
import { checker } from './lib';

//checking status mesasge interface
interface Imessage {
  userName: string;
  siteName: string;
  uri: string;
  exist: false;
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
      rawSites.map(siteName => {
        return new Promise<Imessage>(async (resolve, reject) => {
          const message = await this.checkFor(siteName);
          resolve(message);
        });
      })
    );
    return messages;
  }

  async checkFor(siteName: string): Promise<Imessage> {
    try {
      const message = await checker(siteName, this.userName);
      return message;
    } catch (e) {
      throw e;
    }
  }
}

export default JsherLock;

export { Imessage };

module.exports = JsherLock;
module.exports.default = JsherLock;
