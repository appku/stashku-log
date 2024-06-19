
[![NPM](https://img.shields.io/npm/v/@appku/stashku-log)](https://npmjs.org/package/@appku/stashku-log)
[![License](https://img.shields.io/npm/l/@appku/stashku-log)](https://npmjs.org/package/@appku/stashku-log)
[![Downloads](https://img.shields.io/npm/dt/@appku/stashku-log)](https://npmjs.org/package/@appku/stashku-log)

# StashKu Log Middleware
This StashKu middleware project provides logging to console and/or to a rolling file directory. It provides support for
the various severities of StashKu logging: `error`, `warn`, `info`, and `debug`.

StashKu Log can also be used independently, without StashKu to simply log in a standardized way that enforces severity
level logging (no `console.log` generalities). 

This package supports 2 modes of logging, each can be enabled/disabled and configured independently of one another:
- `"console"`: Outputs logs to `stdout` (usually to the terminal). This logger is enabled by default.
- `"file"`: Writes logs to a log file on a file-system. *Currently under development.*

## Getting Started
```sh
npm i --save @appku/stashku-log
```

To utilize this middleware with `stashku`, this middleware can be passed to StashKu through the configuration to provide functionality. 

```js
import log from '@appku/stashku-log';
let stash = new StashKu({
    middleware: [log],
    '@appku/stashku-log': {
        console: {
            enabled: true,
            severity: 'info',
            colors: true,
            timestamp: true,
            local: true
        },
        file: {
            enabled: false
            path: './'
        }
    }
});
```

### Code Quick-Start
You should utilize your StashKu instance's `log` property to make logs function calls. In the absence of StashKu, you can make log calls directly with this library:

#### Within StashKu
```js
let stash = new StashKu( ... ); ///see Configuration section below
stash.log.debug('Look ma! I am debugging.');
stash.log.info('Look ma! I am pretty.');
stash.log.warn('Look ma! I am smoking.');
stash.log.error('Look ma! I am on fire.');
```

#### Without StashKu
```js
import log from '@appku/stashku-log';
log.debug('Look ma! I am debugging.');
log.info('Look ma! I am pretty.');
log.warn('Look ma! I am smoking.');
log.error('Look ma! I am on fire.');
```

#### Loading After StashKu Initialization
Alternatively, if not loaded by configuration of the StashKu `middleware` property (as shown above), you can use 
StashKu's `use` middleware function:
```js
import log from '@appku/stashku-log';
myStashKuInst.use(log);
...
```

#### Without StashKu
If you are using the stashku-log without StashKu, you can still configure the module, as shown below:
```js
import log from '@appku/stashku-log';
//set the configuration object on the module directly
log.config = { 
    console: { ... }, 
    file: { ... }
}
...
```

To configure the library *without* StashKu, set the `config` property on the module or use environmental variables.

## Documentation
Formal documentation is [available here](https://github.com/appku/stashku-log). 

### Available Configuration Properties
| Property | ENV | Type | Default |
|-|-|-|-|
| console |  | `Object` |  |
| ↳ console.enabled | STASHKU_LOG_CONSOLE_ENABLED | `Boolean` | `true` |
| ↳ console.severity | STASHKU_LOG_CONSOLE_SEVERITY | `String` | |
| ↳ console.timestamp | STASHKU_LOG_CONSOLE_TIMESTAMP | `Boolean` | `true` |
| ↳ console.local | STASHKU_LOG_CONSOLE_LOCAL | `Boolean` | `true` |
| ↳ console.colors | STASHKU_LOG_CONSOLE_COLORS | `Boolean` | `true` |
| file |  | `Object` |  |
| ↳ file.enabled | STASHKU_LOG_FILE_ENABLED | `Boolean` | `false` |

You can utilize environmental variables or define the values through a configuration object passed to StashKu. 
This project also loads `.env` files in it's package directory.

# Running
Run `npm start`

# Building
This project uses node.js to run and does not have an explicit build process.

## Code Documentation
You can generate a static JSDoc site under the `docs/` path using the command `npm run docs`.

# Testing
This project uses `jest` to perform unit tests.

## Running Tests
Run `npm test` to run jest unit tests.

Run `npm run lint` to run ESLint, optionally install the Visual Studio Code ESLint extension to have linting issues show in your "Problems" tab and be highlighted.

If you are writing unit tests, you may need to `npm install @types/jest` to get intellisense in Visual Studio Code if for some reason it did not get installed.

# Publishing
Only maintainers with proper access can publish this package to npm. To do so as maintainers, you can publish by running the following command:

```sh
npm publish --registry=https://registry.npmjs.org --access=public
```