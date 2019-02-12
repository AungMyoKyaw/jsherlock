# JSherLock

> Find usernames across social networks

[![Build Status][travis]][travis-url]
[![install size][package-size]][package-size-url]
[![code style: prettier][prettier]][prettier-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![License: MIT][license]][license-url]

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
import jsherlock from 'jsherlock';

const checker = new jsherlock('username');

checker
  .checkAll()
  .then(status => {
    console.log(status);
  })
  .catch(err => {
    console.log(err);
  });

//=> [
//=>   {
//=>     "userName": "username",
//=>     "siteName": "siteName",
//=>     "uri": "url://url.url/username",
//=>     "exist": false
//=>   }
//=> ]
```

### checkFor

check username availability for individual site

### Example

```javascript
import jsherlock from 'jsherlock';

const checker = new jsherlock('username');

checker
  .checkFor('site')
  .then(status => {
    console.log(status);
  })
  .catch(err => {
    console.log(err);
  });

//=>  {
//=>    "userName": "username",
//=>    "siteName": "siteName",
//=>    "uri": "url://url.url/username",
//=>    "exist": false
//=>  }
```

### sites

available sites

### Example

```javascript
import jsherlock from 'jsherlock';

const sites = jsherlock.sites();

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
[contri]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square
[contri-url]: https://github.com/AungMyoKyaw/jsherlock/issues
[travis]: https://img.shields.io/travis/AungMyoKyaw/jsherlock/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/AungMyoKyaw/jsherlock
[npm-download]: https://img.shields.io/npm/dt/jsherlock.svg?style=flat-square
[npm-dl-url]: https://www.npmjs.com/package/jsherlock
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[package-size]: https://packagephobia.now.sh/badge?p=jsherlock@0.0.7
[package-size-url]: https://packagephobia.now.sh/result?p=jsherlock@0.0.7
