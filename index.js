var os = require("os");
var path = require("path");

var glslangValidatorPath;

var suffixes = {
  darwin: ".darwin",
  linux: ".linux",
  win32: ".exe"
};

function getPath() {
  if (!glslangValidatorPath) {

    var platform = os.platform();
    if (!suffixes[platform]) {
      throw new Error("glslang-validator-prebuilt: Unsupported platform: " + platform);
    }

    var arch = os.arch();
    if (arch !== "x64") {
      throw new Error("glslang-validator-prebuilt: Unsupported architecture: " + arch);
    }

    glslangValidatorPath = path.join(
      __dirname,
      "bin",
      "glslangValidator" + suffixes[platform]
    );
  }

  return glslangValidatorPath;
}

exports.getPath = getPath;

Object.defineProperty(exports, 'path', {
  get: getPath,
});
