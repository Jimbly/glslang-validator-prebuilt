var assert = require('assert');
var fs = require('fs');
var glslangValidator = require('.');

console.log(`Path = ${glslangValidator.path}`);

var stats = fs.statSync(glslangValidator.path);
assert(stats.isFile(glslangValidator.path));
