import { join } from 'path';
import { existsSync } from 'fs';
import ava from 'ava';
import bluebird = require('bluebird');

import fixture from './fixture';

// this is used by last test.
const cwd = process.cwd();

const ftest = fixture(ava, join(process.env.PWD, 'fixtures'));

ftest('abs path', 'case-1', (t, path) => {
  const filePath = join(path, 'somefile.txt');
  t.plan(1);
  t.true(existsSync(filePath), 'should find somefile.txt');

  // make sure it works for custom promise libraries.
  return bluebird.resolve();
});

const rtest = fixture(ava, './fixtures');

rtest('relative path', 'case-1', (t, path) => {
  const filePath = join(path, 'somefile.txt');
  t.true(existsSync(filePath), 'should find somefile.txt');
  t.is(process.cwd(), path, 'cwd set to case path.');
});

ftest('case-1', (t, path) => {
  t.pass('work without title.');
  t.is(process.cwd(), path, 'cwd set to case path.');
});

// `test.only` test needs to be commented out so other tests can run. :)
// ftest.only('only test', 'case-1', t => {
//   t.pass('only works');
// });

// ftest.only('case-1', t => {
//   t.pass('only without title works.');
// });

ftest.skip('skip test', 'case-1', t => {
  t.pass('skip test works.');
});

ftest.skip('case-1', t => {
  t.pass('skip without title works.');
});

ftest.serial('serial', 'case-1', t => {
  t.pass('serial works.');
});

ftest.serial('case-1', t => {
  t.pass('serial without title works.');
});

ftest.todo('todo test');

ftest.cb('cb', 'case-1', t => {
  t.pass('cb works.');
  t.end();
});

ftest.cb('case-1', t => {
  t.pass('cb without title works.');
  t.end();
});

ava(t => {
  t.is(process.cwd(), cwd, 'normal ava test still under normal cwd.');
});
