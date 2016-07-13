'use strict';

const cp = require('child_process');
const rimraf = require('rimraf');

// cleanup and compile before running ava.
// Have to run tsc and tsc -w because I can't detect and start ava when tsc -w complete compiling the first time.
rimraf.sync('dist');
cp.spawnSync('tsc');

const tsc = cp.spawn('tsc', ['-w']);
const ava = cp.spawnSync('ava', ['-w', 'dist/**/*.spec.js'], {
  cwd: process.env.PWD,
  stdio: 'inherit'
});
