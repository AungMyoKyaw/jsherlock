import * as assert from 'assert';
import 'mocha';

import JsherLock from '../src/';
import { Imessage } from '../src/';

describe('JSHERLOCK', () => {
  describe('CHECK_ALL', async () => {
    const checker = new JsherLock('zuck');
    const status: Imessage[] = await checker.checkAll();
    assert.equal(status.length >= 1, true);
  });

  describe('CHECK_FOR', async () => {
    const checker = new JsherLock('zuck');
    const status: Imessage = await checker.checkFor('Facebook');
    assert.equal([status].length == 1, true);
  });

  describe('SITES', () => {
    const sites: string[] = JsherLock.sites();
    assert.equal(sites.length >= 1, true);
  });
});
