# glslang-validator-prebuilt-predownloaded

Same as [glslang-validator-prebuilt](https://github.com/fand/glslang-validator-prebuilt) except the binaries are downloaded and included in the package, so as not to require a whole ton of run-time `dependencies` for an install-time action.

## Install

``` bash
$ npm install glslang-validator-prebuilt-predownloaded
```

## Usage

Returns the path of a glslangValidator binary on the local filesystem.

``` js
var validator = require('glslang-validator-prebuilt-predownloaded');
console.log(validator.path);
// /Users/foo/node_modules/glslang-validator-prebuilt/bin/darwin/glslangValidator
```

## LICENSE

MIT
