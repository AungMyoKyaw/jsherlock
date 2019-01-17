//checking status mesasge interface
interface message {
  userName: string;
  siteName: string;
  url: string;
  exist: false;
}

class JsherLock {
  private userName: string;

  constructor(userName: string) {
    this.userName = userName;
  }

  static sites(): [string] {
    return ['google'];
  }

  checkAll(): [message] {
    return [
      {
        userName: this.userName,
        siteName: 'siteName',
        url: 'url',
        exist: false
      }
    ];
  }

  checkFor(siteName: string): message {
    return {
      userName: this.userName,
      siteName: siteName,
      url: 'url',
      exist: false
    };
  }
}

export default JsherLock;

export { message };

module.exports = JsherLock;
module.exports.default = JsherLock;
