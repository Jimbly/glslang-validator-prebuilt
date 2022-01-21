var os = require("os");
var path = require("path");

var platform = os.platform();
if (platform !== "linux" && platform !== "darwin" && platform !== "win32") {
  console.error("glslang-validator-prebuilt: Unsupported platform:", platform);
  process.exit(1);
}

var arch = os.arch();
if (arch !== "x64") {
  console.error("glslang-validator-prebuilt: Unsupported architecture:", arch);
  process.exit(1);
}

var suffixes = {
  darwin: ".darwin",
  linux: ".linux",
  win32: ".exe"
};

var glslangValidatorPath = path.join(
  __dirname,
  "bin",
  "glslangValidator" + suffixes[platform]
);

module.exports = {
  path: glslangValidatorPath
};
