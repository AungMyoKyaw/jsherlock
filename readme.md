# JSherLock

> Find usernames across social networks

## Install

```shell
npm install jsherlock
```

## API

- [ checkall ](#checkAll)
- [ checkFor ](#checkFor)
- [ sites ](#sites)

### checkAll

check username availability across social networks

### Example

```javascript
import JsherLock from 'jsherlock';

const checker = new JsherLock('username');

const status = checker.checkAll();

//=> [
//=>   {
//=>     "userName": "username",
//=>     "siteName": "siteName",
//=>     "url": "url://url.url/username",
//=>     "exist": false
//=>   }
//=> ]
```

### checkFor

check username availability for individual site

### Example

```javascript
import JsherLock from 'jsherlock';

const checker = new JsherLock('username');

const status = checker.checkFor('site');

//=>  {
//=>    "userName": "username",
//=>    "siteName": "siteName",
//=>    "url": "url://url.url/username",
//=>    "exist": false
//=>  }
```

### sites

available sites

### Example

```javascript
import JsherLock from 'jsherlock';

const sites = checker.sites();

//=>  ["site"]
```

## Related

- [ jsherlock-cli ][jsherlock-cli]

## LICENSE

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

[jsherlock-cli]: https://github.com/AungMyoKyaw/jsherlock-cli
