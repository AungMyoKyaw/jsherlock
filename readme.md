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

Or using yarn:

```shell
yarn add jsherlock
```

## Usage

### TypeScript

```typescript
import JsherLock, { Imessage, SiteNotFoundError, NetworkError } from 'jsherlock';

const checker = new JsherLock('username');

try {
  const results: Imessage[] = await checker.checkAll();
  console.log(results);
} catch (error) {
  if (error instanceof SiteNotFoundError) {
    console.error('Site not supported:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('Network issue:', error.message);
  }
}
```

### JavaScript (ESM)

```javascript
import JsherLock from 'jsherlock';

const checker = new JsherLock('username');
const results = await checker.checkAll();
console.log(results);
```

### JavaScript (CommonJS)

```javascript
const JsherLock = require('jsherlock');

const checker = new JsherLock('username');
checker.checkAll().then(results => {
  console.log(results);
});
```

## API

### `new JsherLock(username)`

Creates a new JsherLock instance.

- `username` (string, required): The username to search for across social networks.

### `checkAll(): Promise<Imessage[]>`

Check username availability across all supported social networks.

Returns an array of results with the following structure:

```typescript
interface Imessage {
  userName: string;   // The username searched
  siteName: string;   // The social network name
  uri: string;        // The profile URL
  exist: boolean;     // Whether the username exists on this site
}
```

### `checkFor(siteName: string): Promise<Imessage>`

Check username availability for a specific site.

- `siteName` (string): The name of the site to check (e.g., 'GitHub', 'Twitter')

### `static sites(): string[]`

Get a list of all supported sites.

## Error Handling

JsherLock provides custom error classes for better error handling:

- `JsherLockError` - Base error class
- `SiteNotFoundError` - Thrown when checking an unsupported site
- `NetworkError` - Thrown when network requests fail

## Example

```javascript
import JsherLock from 'jsherlock';

const checker = new JsherLock('zuck');

// Check all sites
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
//=>     "userName": "zuck",
//=>     "siteName": "Facebook",
//=>     "uri": "https://www.facebook.com/zuck",
//=>     "exist": true
//=>   },
//=>   ...
//=> ]

// Check individual site
checker
  .checkFor('GitHub')
  .then(status => {
    console.log(status);
  })
  .catch(err => {
    console.log(err);
  });

//=>  {
//=>    "userName": "zuck",
//=>    "siteName": "GitHub",
//=>    "uri": "https://www.github.com/zuck",
//=>    "exist": false
//=>  }

// Get supported sites
const sites = JsherLock.sites();
console.log(sites);

//=>  ["Instagram", "Twitter", "Facebook", "GitHub", ...]
```

## Supported Sites

JSherLock supports over 100 social networks including:

- Facebook, Twitter, Instagram
- GitHub, GitLab, BitBucket
- LinkedIn, Reddit, Medium
- YouTube, Vimeo, Twitch
- And many more...

Use `JsherLock.sites()` to get the complete list.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```shell
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Format code
npm run format

# Lint code
npm run lint
```

## Requirements

- Node.js >= 18

## Related

- [jsherlock-cli][jsherlock-cli] - Command-line interface for JSherLock

## Inspired by

- [sherlock][inspired-by] - Hunt down social media accounts by username across social networks

## License

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

[inspired-by]: https://github.com/sherlock-project/sherlock
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
