# JSherLock

> Find usernames across social networks

## Install

```shell
npm install jsherlock
```

## API

- [ checkAll ](#checkAll)
- [ checkFor ](#checkFor)
- [ sites ](#sites)

### checkAll

check username availability across social networks

### Example

```javascript
import JsherLock from 'jsherlock';

const checker = new JsherLock('username');

checker
  .checkAll()
  .then(status => {
    console.log(status);
  })
  .catch(err => {
    throw err;
  });

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

checker
  .checkFor('site')
  .then(status => {
    console.log(status);
  })
  .catch(err => {
    throw err;
  });

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

const sites = JsherLock.sites();

console.log(sites);

//=>  ["site"]
```

## Related

- [ jsherlock-cli ][jsherlock-cli]

## Inspired by

- [sherlock][inspired-by]

## LICENSE

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

[inspired-by]: https://github.com/TheYahya/sherlock
[jsherlock-cli]: https://github.com/AungMyoKyaw/jsherlock-cli
