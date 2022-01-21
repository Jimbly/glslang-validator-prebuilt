const fs = require("fs");
const os = require("os");
const path = require("path");
const download = require("download");
const tempDirRoot = require("temp-dir");
const extract = require("decompress");
const rimraf = require("rimraf");
const mkdirp = require('mkdirp');
const p = require("pify");
const argv = require('minimist')(process.argv.slice(2));

// Utility functions
const log = (str) => console.log('glslang-validator-prebuilt:', str);
const err = (str) => {
  console.error('glslang-validator-prebuilt', str);
  console.error('glslang-validator-prebuilt: Install failed.');
  process.exit(1);
}


const platform = argv._.join();

log(`Installing glslangValidator (${platform})...`);

if (platform !== "linux" && platform !== "darwin" && platform !== "win32") {
  err(`Unsupported platform: ${platform}`);
}


const filenames = {
  darwin: "glslang-master-osx-Release",
  linux: "glslang-master-linux-Release",
  win32: "glslang-master-windows-x64-Release"
};
const src_suffixes = {
  darwin: "",
  linux: "",
  win32: ".exe"
};
const dest_suffixes = {
  darwin: ".darwin",
  linux: ".linux",
  win32: ".exe"
};

const filename = filenames[platform];
const suffix_src = src_suffixes[platform];
const suffix_dest = dest_suffixes[platform];
const url = `https://github.com/KhronosGroup/glslang/releases/download/master-tot/${filename}.zip`;
const tempDir = path.resolve(tempDirRoot, "glslang-validator-prebuilt");
const zipPath = path.resolve(tempDir, `${filename}.zip`);
const unzippedBinPath = path.resolve(tempDir, `bin/glslangValidator${suffix_src}`);
const dstBinPath = path.resolve(__dirname, `bin/glslangValidator${suffix_dest}`);
const dstBinDir = path.resolve(__dirname, `bin`);

const run = (promise, msg) => promise.catch(e => {
  console.error(e);
  throw new Error(msg);
});

let prom = p(rimraf)(tempDir)
  .then(() => run(mkdirp(tempDir), `Failed to create temporal directory: '${tempDir}'`))
  .then(() => run(download(url, tempDir), `Failed to download the binary to: ${tempDir}`))
  .then(() => run(extract(zipPath, tempDir), `Failed to extract zip file: '${zipPath}'`));
if (argv.clean) {
  prom = prom.then(() => run(p(rimraf)(dstBinDir), `Failed to clean up bin directory: '${dstBinDir}'`));
}
prom.then(() => run(mkdirp(dstBinDir), `Failed to create temporal directory: '${dstBinDir}'`))
  .then(() => run(p(fs.copyFile)(unzippedBinPath, dstBinPath), `Failed to copy binary to: '${dstBinPath}'`))
  .then(() => run(p(fs.chmod)(dstBinPath, "755"), `Failed to chmod binary: '${dstBinPath}'`))
  .then(() => {
    log("Installed glslangValidator successfully!");
  })
  .catch(e => {
    console.error(e);
    err("Failed to install glslang-validator.");
  });
