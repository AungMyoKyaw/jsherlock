import { sites as rawSites } from './data';
import { checker, JsherLockError, SiteNotFoundError, NetworkError } from './lib';

export { JsherLockError, SiteNotFoundError, NetworkError };

export interface Imessage {
  userName: string;
  siteName: string;
  uri: string;
  exist: boolean;
}

class JsherLock {
  private userName: string;
  private sites: string[];

  constructor(userName: string) {
    if (!userName || typeof userName !== 'string') {
      throw new Error('Username must be a non-empty string');
    }
    this.userName = userName;
    this.sites = [...rawSites];
  }

  static sites(): string[] {
    return [...rawSites];
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
