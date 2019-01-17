import * as assert from 'assert';
import 'mocha';

import JsherLock from '../src/';
import { message } from '../src/';

describe('JSHERLOCK', () => {
  describe('CHECK_ALL', () => {
    const checker = new JsherLock('zuck');
    const status: [message] = checker.checkAll();
    assert.equal(status.length, 1);
  });

  describe('CHECK_FOR', () => {
    const checker = new JsherLock('zuck');
    const status: message = checker.checkFor('facebook');
    assert.equal([status].length, 1);
  });

  describe('SITES', () => {
    const sites: [string] = JsherLock.sites();
    assert.equal(sites.length, 1);
  });
});
