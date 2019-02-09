import * as assert from 'assert';
import 'mocha';

import JsherLock from '../src/';
import { Imessage } from '../src/';

describe('JSHERLOCK', () => {
  it('SHOULD CHECK FOR ALL SUPPORTED SITES', async () => {
    const checker = new JsherLock('zuck');
    const status: Imessage[] = await checker.checkAll();
    console.log(status);
    assert.equal(status.length >= 1, true);
  });

  it('SHOULD CHECK FOR INDIVIDUAL SITE', async () => {
    const checker = new JsherLock('zuck');
    const status: Imessage = await checker.checkFor('Facebook');
    assert.equal([status].length == 1, true);
  });

  it('SHOULD RETURN SUPPORTED SITES', () => {
    const sites: string[] = JsherLock.sites();
    assert.equal(sites.length >= 1, true);
  });
});
